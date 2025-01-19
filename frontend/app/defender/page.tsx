'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TypographyH3 } from '@/components/typography/typography';
import { useGame } from '@/contexts/GameContext';
import Computer from '@/components/Computer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dial from '../../components/Dial'

export default function Defender() {
    const { defenderMoney, defenderMoves, attackerMoney } = useGame();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMoves, setSelectedMoves] = useState<
        Array<{ name: string; id: number }>
    >([]);
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
            });
            moves.splice(randomIndex, 1);
        }

        setSelectedMoves(selected);
    }, [defenderMoves]);

    const handleSubmit = () => {
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
                                    <Button className={`bg-custom-navy flex-1`}>
                                        {selectedMoves[0]?.name || 'Loading...'}
                                    </Button>
                                    <Button className={`bg-custom-navy flex-1`}>
                                        {selectedMoves[1]?.name || 'Loading...'}
                                    </Button>
                                </div>
                                <div className="flex w-full gap-2">
                                    <Button className={`bg-custom-navy flex-1`}>
                                        {selectedMoves[2]?.name || 'Loading...'}
                                    </Button>
                                    <Button className={`bg-custom-navy flex-1`}>
                                        {selectedMoves[3]?.name || 'Loading...'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`bg-custom-navy`}
                                onClick={handleSubmit}
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
