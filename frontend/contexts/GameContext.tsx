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
    defenderMoves: typeof defenderMoves;
    attackerMoves: typeof attackerMoves;
}

interface MoveEntry {
    role: PlayerRole;
    move: string;
    turn: number;
    effect: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const defenderMoves = [
    {
        id: 10,
        name: 'Implement an Intrusion Detection System',
        power: 8,
        cost: 6,
        type: 'network',
    },
    {
        id: 11,
        name: 'Basic Employee Cybersecurity Training',
        power: 8,
        cost: 4,
        type: 'training',
    },
    {
        id: 12,
        name: 'Review Audit Logs',
        power: 6,
        cost: 2,
        type: 'server',
        condition: 'logsCovered',
    },
    {
        id: 13,
        name: 'Find backdoor and implement a Honeypot Server',
        power: 9,
        cost: 12,
        type: 'server',
        condition: 'backdoor',
    },
    {
        id: 14,
        name: 'Implement a Load Balancer',
        power: 5,
        cost: 2,
        type: 'network',
    },
    {
        id: 15,
        name: 'Shut Down, Detect and Restart Server',
        power: 20,
        cost: 20,
        type: 'network',
        condition: 'customerIssues',
    },
    {
        id: 16,
        name: 'Release a press release',
        power: 4,
        cost: 6,
        type: 'network',
        condition: 'customerIssuesApparent',
    },
    {
        id: 17,
        name: 'Implement Robust Patch Management processes',
        power: 9,
        cost: 5,
        type: 'network',
    },
    {
        id: 18,
        name: 'Two-Factor Authentication Rollout',
        power: 8,
        cost: 4,
        type: 'network',
    },
    {
        id: 19,
        name: 'Hire External Incident Response Team',
        power: 16,
        cost: 12,
        type: 'network',
    },
];

const attackerMoves = [
    {
        id: 1,
        name: 'SQL Injection',
        power: 3,
        cost: 2,
        type: 'database',
        condition: 'inputValidation',
    },
    {
        id: 2,
        name: 'Targeted Phishing Attack',
        power: 9,
        cost: 5,
        type: 'social',
        condition: 'trainingProgram',
    },
    {
        id: 3,
        name: 'Distributed Denial of Service Attack (DDoS)',
        power: 9,
        cost: 4,
        type: 'network',
        condition: 'loadBalCustomerIssues',
    },
    {
        id: 4,
        name: 'Zero Day Exploit',
        power: 15,
        cost: 10,
        type: 'network',
        condition: 'idsOrPatch',
    },
    {
        id: 5,
        name: 'USB Scattering in Parking Lot',
        power: 7,
        cost: 2,
        type: 'network',
        condition: 'trainingProgram',
    },
    {
        id: 6,
        name: 'Brute-Force Attack on Login',
        power: 7,
        cost: 4,
        type: 'network',
        condition: 'twoFactorAuth',
    },
    {
        id: 7,
        name: 'Escalate Privileges',
        power: 10,
        cost: 6,
        type: 'network',
        condition: 'auditLogsOrTracks',
    },
    {
        id: 8,
        name: 'Cover tracks and Install Backdoor',
        power: 10,
        cost: 4,
        type: 'network',
    },
    {
        id: 9,
        name: 'Export files and introduce ransomware',
        power: 120,
        cost: 8,
        type: 'network',
        condition: 'serverShutdown',
    },
];

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
                defenderMoves,
                attackerMoves,
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
