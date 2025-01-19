import { useGame } from '../context/GameContext';
import { useState } from 'react';

export function useGameLogic() {
    const {
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
    } = useGame();

    const [turnNumber, setTurnNumber] = useState(0);
    const [gameScore, setGameScore] = useState(0);
    const [currentTurn, setCurrentTurn] = useState<'attacker' | 'defender'>('attacker');
    const [attackerMove, setAttackerMove] = useState(null);
    const [defenderMove, setDefenderMove] = useState(null);
    const [conditions, setConditions] = useState({
        inputValidation: false,
        trainingProgram: false,
        loadBalancer: false,
        idsOrPatch: false,
        twoFactorAuth: false,
        auditLogs: false,
        serverShutdown: false,
        customerIssues: false,
    });

    const MOVE_DICTIONARY = {
        attacker: [
            { id: 1, name: 'SQL Injection', power: 3, cost: 2, type: 'database', condition: 'inputValidation' },
            { id: 2, name: 'Targeted Phishing Attack', power: 9, cost: 5, type: 'social', condition: 'trainingProgram' },
            { id: 3, name: 'Distributed Denial of Service Attack (DDoS)', power: 9, cost: 4, type: 'network', condition: 'loadBalCustomerIssues' },
            { id: 4, name: 'Zero Day Exploit', power: 15, cost: 10, type: 'network', condition: 'idsOrPatch' },
            { id: 5, name: 'USB Scattering in Parking Lot', power: 7, cost: 2, type: 'network', condition: 'trainingProgram' },
            { id: 6, name: 'Brute-Force Attack on Login', power: 7, cost: 4, type: 'network', condition: 'twoFactorAuth' },
            { id: 7, name: 'Escalate Privileges', power: 10, cost: 6, type: 'network', condition: 'auditLogsOrTracks' },
            { id: 8, name: 'Cover tracks and Install Backdoor', power: 10, cost: 4, type: 'network' },
            { id: 9, name: 'Export files and introduce ransomware', power: 120, cost: 8, type: 'network', condition: 'serverShutdown' },
        ],
        defender: [
            { id: 10, name: 'Implement an Intrusion Detection System', power: 8, cost: 6, type: 'network' },
            { id: 11, name: 'Basic Employee Cybersecurity Training', power: 8, cost: 4, type: 'training' },
            { id: 12, name: 'Review Audit Logs', power: 6, cost: 2, type: 'server', condition: 'logsCovered' },
            { id: 13, name: 'Find backdoor and implement a Honeypot Server', power: 9, cost: 12, type: 'server', condition: 'backdoor' },
            { id: 14, name: 'Implement a Load Balancer', power: 5, cost: 2, type: 'network' },
            { id: 15, name: 'Shut Down, Detect and Restart Server', power: 20, cost: 20, type: 'network', condition: 'customerIssues' },
            { id: 16, name: 'Release a press release', power: 4, cost: 6, type: 'network', condition: 'customerIssuesApparent' },
            { id: 17, name: 'Implement Robust Patch Management processes', power: 9, cost: 5, type: 'network' },
            { id: 18, name: 'Two-Factor Authentication Rollout', power: 8, cost: 4, type: 'network' },
            { id: 19, name: 'Hire External Incident Response Team', power: 16, cost: 12, type: 'network' },
        ],
    };

    const getRandomMoves = (role, count = 4) => {
        const availableMoves = [...MOVE_DICTIONARY[role || 'attacker']];
        count = Math.min(count, availableMoves.length);
        for (let i = availableMoves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableMoves[i], availableMoves[j]] = [availableMoves[j], availableMoves[i]];
        }
        return availableMoves.slice(0, count);
    };

    const switchTurn = () => {
        setCurrentTurn((prev) => (prev === 'attacker' ? 'defender' : 'attacker'));
    };

    const performMove = (role, moveId) => {
        setTurnNumber((prev) => prev + 1);

        const move = MOVE_DICTIONARY[role || 'attacker'].find((m) => m.id === moveId);
        if (!move) return 'Invalid move!';

        if (role === 'attacker' && attackerMoney < move.cost) {
            return 'Attacker does not have enough money!';
        }
        if (role === 'defender' && defenderMoney < move.cost) {
            return 'Defender does not have enough money!';
        }

        // Deduct money
        if (role === 'attacker') {
            setAttackerMoney((prev) => prev - move.cost);
            setAttackerMove(move);
        } else {
            setDefenderMoney((prev) => prev - move.cost);
            setDefenderMove(move);
        }

        // Update histories
        setMoveHistory((prev) => [
            ...prev,
            { role, move: move.name, turn: turnNumber + 1, effect: move.power },
        ]);

        if (turnNumber % 2 === 0) {
            const attackerPower = applyMoveLogic(attackerMove, 'attacker');
            const defenderPower = applyMoveLogic(defenderMove, 'defender');
            setGameScore((prev) => prev + attackerPower - defenderPower);
            setAttackerMove(null);
            setDefenderMove(null);
        }

        switchTurn();
        return 'Move successful!';
    };

    const applyMoveLogic = (move, role) => {
    const { condition, power } = move;
    let adjustedPower = power;

    if (conditions[condition]) {
        if (role === 'attacker') {
            if (
                ['auditLogs', 'twoFactorAuth', 'serverShutdown', 'loadBalCustomerIssues'].includes(condition) &&
                moveExistsInHistory(12)
            ) {
                adjustedPower = 0;
            }
            if (
                condition === 'idsOrPatch' && (moveExistsInHistory(10) || moveExistsInHistory(17)) ||
                condition === 'trainingProgram' && moveExistsInHistory(11)
            ) {
                adjustedPower = power - 7;
            }
        } else if (role === 'defender') {
            if (condition === 'logsCovered' && moveExistsInHistory(8)) adjustedPower = 0;
            if (condition === 'backdoor' && moveExistsInHistory(8)) adjustedPower = 120;
            if (condition === 'customerIssues' && moveExistsInHistory(15)) adjustedPower = power - 2;
            if (condition === 'customerIssuesApparent' && moveExistsInHistory(15)) adjustedPower = 9;
        }
    }

    setPowerHistory((prev) => [...prev, adjustedPower]);
    return adjustedPower;
};

    return {
        playerRole,
        getRandomMoves,
        switchTurn,
        performMove,
        turnNumber,
        gameScore,
        currentTurn,
        moveHistory,
        powerHistory,
    };
}
