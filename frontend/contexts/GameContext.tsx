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
    attackerHealth: number;
    setAttackerHealth: (health: number) => void;
    defenderHealth: number;
    setDefenderHealth: (health: number) => void;
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

const attackerMoves = [
    {
        id: 1,
        name: 'SQL Injection',
        power: 3,
        cost: 2,
        type: 'database',
        condition: 'inputValidation',
        description:
            'A cyberattack where malicious SQL queries are inserted into input fields to manipulate a database, often leading to unauthorized access or data theft. Generally can be protected against by using proper input validation.',
    },
    {
        id: 2,
        name: 'Targeted Phishing Attack',
        power: 9,
        cost: 5,
        type: 'social',
        condition: 'trainingProgram',
        description:
            'A personalized phishing attempt aimed at specific individuals or organizations to steal sensitive information or deploy malware. Employee cybersecurity training programs can help mitigate risk.',
    },
    {
        id: 3,
        name: 'Distributed Denial of Service Attack (DDoS)',
        power: 9,
        cost: 4,
        type: 'network',
        condition: 'loadBalCustomerIssues',
        description:
            'An attack that overwhelms a server or network with traffic from multiple sources, often bots, causing disruption or downtime. Server-side load balancing can decrease effects.',
    },
    {
        id: 4,
        name: 'Zero Day Exploit',
        power: 15,
        cost: 10,
        type: 'network',
        condition: 'idsOrPatch',
        description:
            'An attack that targets a software vulnerability unknown to the vendor, leaving no time for a fix before exploitation. Potential methods to help mitigate risk include patch management and intrusion detection.',
    },
    {
        id: 5,
        name: 'USB Scattering in Parking Lot',
        power: 7,
        cost: 2,
        type: 'network',
        condition: 'trainingProgram',
        description:
            'A social engineering tactic where malicious USB drives are left in public places, like parking lots, to tempt individuals into plugging them into their computers, potentially installing malware or stealing data. Training programs decrease risk.',
    },
    {
        id: 6,
        name: 'Brute-Force Attack',
        power: 7,
        cost: 4,
        type: 'network',
        condition: 'twoFactorAuth',
        description:
            'A method of hacking login credentials by systematically trying all possible password combinations until the correct one is found. 2FA can protect against brute force attacks.',
    },
    {
        id: 7,
        name: 'Escalate Privileges',
        power: 10,
        cost: 6,
        type: 'network',
        condition: 'auditLogsOrTracks',
        description:
            'Gaining higher access rights or permissions than intended, allowing unauthorized control over systems or data.',
    },
    {
        id: 8,
        name: 'Cover tracks and Install Backdoor',
        power: 10,
        cost: 4,
        type: 'network',
        description:
            'Cover Tracks: Actions taken by attackers to erase evidence of their activities and avoid detection, such as deleting logs or altering timestamps. Install Backdoor: Implanting hidden access methods in a system to allow future unauthorized entry, bypassing normal security measures.',
    },
    {
        id: 9,
        name: 'Export files and introduce ransomware',
        power: 120,
        cost: 8,
        type: 'network',
        condition: 'serverShutdown',
        description:
            'Export Files: Unauthorized copying or transferring of sensitive data from a system to an external location for theft or misuse. Introduce Ransomware: Deploying malware that encrypts a victims data and demands payment for the decryption key.',
    },
];

const defenderMoves = [
    {
        id: 10,
        name: 'Implement an Intrusion Detection System',
        power: 8,
        cost: 6,
        type: 'network',
        description:
            'A security tool that monitors network or system activity for malicious behavior or policy violations and alerts administrators of potential threats.',
    },
    {
        id: 11,
        name: 'Basic Employee Cybersecurity Training',
        power: 8,
        cost: 4,
        type: 'training',
        description:
            'Education for employees on recognizing and preventing common cyber threats, such as phishing, malware, and secure password practices, to enhance organizational security.',
    },
    {
        id: 12,
        name: 'Review Audit Logs',
        power: 6,
        cost: 2,
        type: 'server',
        condition: 'logsCovered',
        description:
            'The process of examining system or network logs to identify suspicious activities, unauthorized access, or policy violations for security and compliance purposes.',
    },
    {
        id: 13,
        name: 'Find backdoor and implement a Honeypot Server',
        power: 9,
        cost: 12,
        type: 'server',
        condition: 'backdoor',
        description:
            'A decoy system designed to attract attackers, monitor their activities, and gather intelligence about potential threats without risking actual data or systems.',
    },
    {
        id: 14,
        name: 'Implement a Load Balancer',
        power: 5,
        cost: 2,
        type: 'network',
        description:
            'A device or software that distributes incoming network traffic across multiple servers to ensure reliability, improve performance, and prevent overloading.',
    },
    {
        id: 15,
        name: 'Shut Down, Detect and Restart Server',
        power: 20,
        cost: 20,
        type: 'network',
        condition: 'customerIssues',
        description:
            'A response to a security incident or system failure where the server is stopped to halt malicious activity, analyzed for issues, and then restarted to restore normal operations.',
    },
    {
        id: 16,
        name: 'Release a press release',
        power: 4,
        cost: 6,
        type: 'network',
        condition: 'customerIssuesApparent',
        description:
            'A formal statement issued to media outlets to share information with the public. It communicates transparency, accountability, and proactive measures taken to address an issue or share good news, such as resolving a cybersecurity incident or launching a new feature. However, it can draw attention to vulnerabilities, incidents, or failures, potentially harming reputation/stock price or eroding public trust, especially if not handled tactfully.',
    },
    {
        id: 17,
        name: 'Implement Robust Patch Management processes',
        power: 9,
        cost: 5,
        type: 'network',
        description:
            'Establishing a system to regularly update and apply fixes to software vulnerabilities, ensuring security, compliance, and system stability.',
    },
    {
        id: 18,
        name: 'Implement Two-Factor Authentication',
        power: 8,
        cost: 4,
        type: 'network',
        description:
            'Deploying an additional security layer requiring users to verify their identity using two methods, such as a password and a one-time code, to enhance account protection.',
    },
    {
        id: 19,
        name: 'Hire External Incident Response Team',
        power: 16,
        cost: 12,
        type: 'network',
        description:
            'Engaging specialized third-party professionals to investigate, contain, and mitigate cybersecurity incidents, ensuring expert handling and minimizing damage.',
    },
];

export function GameProvider({ children }: { children: ReactNode }) {
    const [playerRole, setPlayerRole] = useState<PlayerRole>('defender');
    const [attackerMoney, setAttackerMoney] = useState(50);
    const [defenderMoney, setDefenderMoney] = useState(80);
    const [attackerHealth, setAttackerHealth] = useState(100);
    const [defenderHealth, setDefenderHealth] = useState(100);
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
                attackerHealth,
                setAttackerHealth,
                defenderHealth,
                setDefenderHealth,
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
