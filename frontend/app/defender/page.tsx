'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from '@/components/ui/card';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { TypographyH3 } from '@/components/typography/typography';
import { useGame } from '@/contexts/GameContext';
import Computer from '@/components/Computer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dial from '../../components/Dial'

export default function Defender() {

    const {
        defenderMoney,
        defenderMoves,
        setDefenderMoney,
        attackerHealth,
        setAttackerHealth,
        defenderHealth,
        attackerMoney,
        setScoreHistory,
    } = useGame();

    const [showPopup, setShowPopup] = useState(false);
    const [selectedMoves, setSelectedMoves] = useState<
        Array<{
            name: string;
            id: number;
            cost: number;
            type: string;
            description: string;
            power: number;
        }>
    >([]);
    const [selectedMove, setSelectedMove] = useState<{
        name: string;
        id: number;
        cost: number;
        type: string;
        description: string;
        power: number;
    } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Create a copy of the moves array
        const moves = [...defenderMoves];
        const selected = [];

        // Select 4 random moves
        for (let i = 0; i < 4 && moves.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * moves.length);
            selected.push({
                name: moves[randomIndex].name,
                id: moves[randomIndex].id,
                cost: moves[randomIndex].cost,
                type: moves[randomIndex].type,
                description: moves[randomIndex].description,
                power: moves[randomIndex].power,
            });
            moves.splice(randomIndex, 1);
        }

        setSelectedMoves(selected);
    }, [defenderMoves]);

    const handleMoveSelect = (move: typeof selectedMove) => {
        if (!move) return;

        if (defenderMoney >= move.cost) {
            setSelectedMove(move);
            setDefenderMoney(defenderMoney - move.cost);
            setAttackerHealth(attackerHealth - move.power);
        } else {
            alert('Not enough money for this move!');
        }
    };

    const handleSubmit = () => {
        // Calculate the gameScore = attackerHealth - defenderHealth
        const gameScore = attackerHealth - defenderHealth;
        setScoreHistory(prev => [...prev, gameScore]);

        // 1) If attackerMoney <= 0 => Defenders win
        if (attackerMoney <= 0) {
            router.push('/end?winner=defender');
            return;
        }

        // 2) If defenderMoney <= 0 => Attackers win
        if (defenderMoney <= 0) {
            router.push('/end?winner=attacker');
            return;
        }

        // 3) If gameScore > 60 => Attackers are far ahead => Attackers win
        if (gameScore > 60) {
            router.push('/end?winner=attacker');
            return;
        }

        // 4) If gameScore < -60 => Defenders are far ahead => Defenders win
        if (gameScore < -60) {
            router.push('/end?winner=defender');
            return;
        }

        // == If no condition is met, go to the next turn as usual ==
        setShowPopup(true);
        setTimeout(() => {
            router.push('/attacker');
        }, 3000);
    };

    let winner = "";
    if (defenderMoney > attackerMoney) {
        winner = "defender";
    } else if (attackerMoney > defenderMoney) {
        winner = "attacker";
    }
    else {
        winner = "equal";
    }
    const gameScore = attackerHealth - defenderHealth;
      
    return (
        <div>
            <div className="bg-gray-700 h-screen w-screen overflow-hidden">
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg">
                            <p className="text-xl font-bold">Transitioning!</p>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Computer />
                </div>
                {/* Main content */}
                <div className="absolute inset-0 z-10 flex items-center justify-center mb-80">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row gap-5 items-center">
                                <TypographyH3>
                                    {
                                        gameScore > 0
                                            ? 'Attacker is winning!'
                                            : gameScore < 0
                                            ? 'Defender is winning'
                                            : 'You are tied!'
                                    }
                                </TypographyH3>
                                <div className="bg-custom-blue rounded-lg px-2 py-1">
                                        <p className="text-white">
                                            {gameScore}
                                        </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 items-center">
                                <TypographyH3>
                                    Select a move to defend the bank:
                                </TypographyH3>
                                <div className="bg-custom-blue rounded-lg px-2 py-1">
                                    <p className="text-white">
                                        ${defenderMoney}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        {
                            <Dial winner={winner}/>
                        }
                        <CardContent>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex w-full gap-2">
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button
                                                className={`bg-custom-navy flex-1 ${
                                                    selectedMove?.id ===
                                                    selectedMoves[0]?.id
                                                        ? 'ring-2 ring-white'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleMoveSelect(
                                                        selectedMoves[0]
                                                    )
                                                }
                                                disabled={
                                                    selectedMove !== null ||
                                                    defenderMoney <
                                                        (selectedMoves[0]
                                                            ?.cost || 0)
                                                }
                                            >
                                                {selectedMoves[0]?.name ||
                                                    'Loading...'}
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex flex-col gap-1">
                                                <p>
                                                    Cost: $
                                                    {selectedMoves[0]?.cost ||
                                                        'Loading...'}
                                                </p>
                                                <p>
                                                    Type:{' '}
                                                    {selectedMoves[0]?.type ||
                                                        'Loading...'}
                                                </p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {selectedMoves[0]
                                                        ?.description ||
                                                        'Loading...'}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>

                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button
                                                className={`bg-custom-navy flex-1 ${
                                                    selectedMove?.id ===
                                                    selectedMoves[1]?.id
                                                        ? 'ring-2 ring-white'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleMoveSelect(
                                                        selectedMoves[1]
                                                    )
                                                }
                                                disabled={
                                                    selectedMove !== null ||
                                                    defenderMoney <
                                                        (selectedMoves[1]
                                                            ?.cost || 0)
                                                }
                                            >
                                                {selectedMoves[1]?.name ||
                                                    'Loading...'}
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex flex-col gap-1">
                                                <p>
                                                    Cost: $
                                                    {selectedMoves[1]?.cost ||
                                                        'Loading...'}
                                                </p>
                                                <p>
                                                    Type:{' '}
                                                    {selectedMoves[1]?.type ||
                                                        'Loading...'}
                                                </p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {selectedMoves[1]
                                                        ?.description ||
                                                        'Loading...'}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                                <div className="flex w-full gap-2">
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button
                                                className={`bg-custom-navy flex-1 ${
                                                    selectedMove?.id ===
                                                    selectedMoves[2]?.id
                                                        ? 'ring-2 ring-white'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleMoveSelect(
                                                        selectedMoves[2]
                                                    )
                                                }
                                                disabled={
                                                    selectedMove !== null ||
                                                    defenderMoney <
                                                        (selectedMoves[2]
                                                            ?.cost || 0)
                                                }
                                            >
                                                {selectedMoves[2]?.name ||
                                                    'Loading...'}
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex flex-col gap-1">
                                                <p>
                                                    Cost: $
                                                    {selectedMoves[2]?.cost ||
                                                        'Loading...'}
                                                </p>
                                                <p>
                                                    Type:{' '}
                                                    {selectedMoves[2]?.type ||
                                                        'Loading...'}
                                                </p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {selectedMoves[2]
                                                        ?.description ||
                                                        'Loading...'}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button
                                                className={`bg-custom-navy flex-1 ${
                                                    selectedMove?.id ===
                                                    selectedMoves[3]?.id
                                                        ? 'ring-2 ring-white'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleMoveSelect(
                                                        selectedMoves[3]
                                                    )
                                                }
                                                disabled={
                                                    selectedMove !== null ||
                                                    defenderMoney <
                                                        (selectedMoves[3]
                                                            ?.cost || 0)
                                                }
                                            >
                                                {selectedMoves[3]?.name ||
                                                    'Loading...'}
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex flex-col gap-1">
                                                <p>
                                                    Cost: $
                                                    {selectedMoves[3]?.cost ||
                                                        'Loading...'}
                                                </p>
                                                <p>
                                                    Type:{' '}
                                                    {selectedMoves[3]?.type ||
                                                        'Loading...'}
                                                </p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {selectedMoves[3]
                                                        ?.description ||
                                                        'Loading...'}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`bg-custom-navy`}
                                onClick={handleSubmit}
                                disabled={!selectedMove}
                            >
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-row m-0 overflow-hidden">
                        <div className="flex flex-row items-center justify-center gap-80 w-full">
                            <div className="ml-[20px]">
                                {' '}
                                {/* Adjust the negative margin as needed */}
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/certi.png?alt=media&token=7f462216-5dbe-42f6-89c2-281e890448f7"
                                    alt="sticky"
                                    className="max-w-[550px] h-auto rotate-6"
                                />
                            </div>
                            <div className="ml-[300px]">
                                {' '}
                                {/* Adjust the negative margin as needed */}
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_1.png?alt=media&token=14bd358e-6242-4eb6-8cb1-7d9937bd848c"
                                    alt="sticky note"
                                    className="max-w-[150px] h-auto -rotate-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-2/3 bg-lightbrown"></div>
            </div>
        </div>
    );
}
