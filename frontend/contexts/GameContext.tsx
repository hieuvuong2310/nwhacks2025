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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [playerRole, setPlayerRole] = useState<PlayerRole>('defender');
    const [attackerMoney, setAttackerMoney] = useState(50);
    const [defenderMoney, setDefenderMoney] = useState(80);

    return (
        <GameContext.Provider
            value={{
                playerRole,
                setPlayerRole,
                attackerMoney,
                setAttackerMoney,
                defenderMoney,
                setDefenderMoney,
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
