'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type PlayerRole = 'attacker' | 'defender' | null;

interface GameContextType {
    playerRole: PlayerRole;
    setPlayerRole: (role: PlayerRole) => void;
    attackerMoney: number;
    setAttackerMoney: (money: number) => void;
    defenderMoney: number;
    setDefenderMoney: (money: number) => void;
    moveHistory: MoveEntry[];
    setMoveHistory: (history: MoveEntry[]) => void;
    powerHistory: number[];
    setPowerHistory: (history: number[]) => void;
}

interface MoveEntry {
    role: PlayerRole;
    move: string;
    turn: number;
    effect: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [playerRole, setPlayerRole] = useState<PlayerRole>('defender');
    const [attackerMoney, setAttackerMoney] = useState(50);
    const [defenderMoney, setDefenderMoney] = useState(80);
    const [moveHistory, setMoveHistory] = useState<MoveEntry[]>([]);
    const [powerHistory, setPowerHistory] = useState<number[]>([]);

    return (
        <GameContext.Provider
            value={{
                playerRole,
                setPlayerRole,
                attackerMoney,
                setAttackerMoney,
                defenderMoney,
                setDefenderMoney,
                moveHistory,
                setMoveHistory,
                powerHistory,
                setPowerHistory,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
