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
            { id: 1, name: 'SQL Injection', power: 3, cost: 2, type: 'database', condition: 'inputValidation', description: 'A cyberattack where malicious SQL queries are inserted into input fields to manipulate a database, often leading to unauthorized access or data theft. Generally can be protected against by using proper input validation.' },
            { id: 2, name: 'Targeted Phishing Attack', power: 9, cost: 5, type: 'social', condition: 'trainingProgram', description: 'A personalized phishing attempt aimed at specific individuals or organizations to steal sensitive information or deploy malware. Employee cybersecurity training programs can help mitigate risk.' },
            { id: 3, name: 'Distributed Denial of Service Attack (DDoS)', power: 9, cost: 4, type: 'network', condition: 'loadBalCustomerIssues', description: 'An attack that overwhelms a server or network with traffic from multiple sources, often bots, causing disruption or downtime. Server-side load balancing can decrease effects.' },
            { id: 4, name: 'Zero Day Exploit', power: 15, cost: 10, type: 'network', condition: 'idsOrPatch', description: 'An attack that targets a software vulnerability unknown to the vendor, leaving no time for a fix before exploitation. Potential methods to help mitigate risk include patch management and intrusion detection.' },
            { id: 5, name: 'USB Scattering in Parking Lot', power: 7, cost: 2, type: 'network', condition: 'trainingProgram', description: 'A social engineering tactic where malicious USB drives are left in public places, like parking lots, to tempt individuals into plugging them into their computers, potentially installing malware or stealing data. Training programs decrease risk.' },
            { id: 6, name: 'Brute-Force Attack', power: 7, cost: 4, type: 'network', condition: 'twoFactorAuth', description: 'A method of hacking login credentials by systematically trying all possible password combinations until the correct one is found. 2FA can protect against brute force attacks.' },
            { id: 7, name: 'Escalate Privileges', power: 10, cost: 6, type: 'network', condition: 'auditLogsOrTracks', description: 'Gaining higher access rights or permissions than intended, allowing unauthorized control over systems or data.' },
            { id: 8, name: 'Cover tracks and Install Backdoor', power: 10, cost: 4, type: 'network', description: 'Cover Tracks: Actions taken by attackers to erase evidence of their activities and avoid detection, such as deleting logs or altering timestamps. Install Backdoor: Implanting hidden access methods in a system to allow future unauthorized entry, bypassing normal security measures.' },
            { id: 9, name: 'Export files and introduce ransomware', power: 120, cost: 8, type: 'network', condition: 'serverShutdown', description: 'Export Files: Unauthorized copying or transferring of sensitive data from a system to an external location for theft or misuse. Introduce Ransomware: Deploying malware that encrypts a victim’s data and demands payment for the decryption key.' },
        ],
        defender: [
            { id: 10, name: 'Implement an Intrusion Detection System', power: 8, cost: 6, type: 'network', description: 'A security tool that monitors network or system activity for malicious behavior or policy violations and alerts administrators of potential threats.' },
            { id: 11, name: 'Basic Employee Cybersecurity Training', power: 8, cost: 4, type: 'training', description: 'Education for employees on recognizing and preventing common cyber threats, such as phishing, malware, and secure password practices, to enhance organizational security.' },
            { id: 12, name: 'Review Audit Logs', power: 6, cost: 2, type: 'server', condition: 'logsCovered', description: 'The process of examining system or network logs to identify suspicious activities, unauthorized access, or policy violations for security and compliance purposes.' },
            { id: 13, name: 'Find backdoor and implement a Honeypot Server', power: 9, cost: 12, type: 'server', condition: 'backdoor', description: 'A decoy system designed to attract attackers, monitor their activities, and gather intelligence about potential threats without risking actual data or systems.' },
            { id: 14, name: 'Implement a Load Balancer', power: 5, cost: 2, type: 'network', description: 'A device or software that distributes incoming network traffic across multiple servers to ensure reliability, improve performance, and prevent overloading.' },
            { id: 15, name: 'Shut Down, Detect and Restart Server', power: 20, cost: 20, type: 'network', condition: 'customerIssues', description: 'A response to a security incident or system failure where the server is stopped to halt malicious activity, analyzed for issues, and then restarted to restore normal operations.' },
            { id: 16, name: 'Release a press release', power: 4, cost: 6, type: 'network', condition: 'customerIssuesApparent', description: 'A formal statement issued to media outlets to share information with the public. It communicates transparency, accountability, and proactive measures taken to address an issue or share good news, such as resolving a cybersecurity incident or launching a new feature. However, it can draw attention to vulnerabilities, incidents, or failures, potentially harming reputation/stock price or eroding public trust, especially if not handled tactfully.' },
            { id: 17, name: 'Implement Robust Patch Management processes', power: 9, cost: 5, type: 'network', description: 'Establishing a system to regularly update and apply fixes to software vulnerabilities, ensuring security, compliance, and system stability.' },
            { id: 18, name: 'Implement Two-Factor Authentication', power: 8, cost: 4, type: 'network', description: 'Deploying an additional security layer requiring users to verify their identity using two methods, such as a password and a one-time code, to enhance account protection.' },
            { id: 19, name: 'Hire External Incident Response Team', power: 16, cost: 12, type: 'network', description: 'Engaging specialized third-party professionals to investigate, contain, and mitigate cybersecurity incidents, ensuring expert handling and minimizing damage.' },
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
