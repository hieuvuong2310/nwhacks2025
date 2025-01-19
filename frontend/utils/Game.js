export class Game {

    MOVE_DICTIONARY = {
        attacker: [
            { id: 1, name: 'SQL Injection', power: 3, cost: 2, type: 'database', condition: 'inputValidation' },                // no effect if input validation
            { id: 2, name: 'Targeted Phishing Attack', power: 9, cost: 5, type: 'social', condition: 'trainingProgram' },        // subtract 7 if training program
            { id: 3, name: 'Distributed Denial of Service Attack (DDoS)', power: 9, cost: 4, type: 'network', condition: 'loadBalCustomerIssues' },    // no effect if load balancer
            { id: 4, name: 'Zero Day Exploit', power: 15, cost: 10, type: 'network', condition: 'idsOrPatch' },              // subtract 7 if IDS or 7 if patch management
            { id: 5, name: 'USB Scattering in Parking Lot', power: 7, cost: 2, type: 'network', condition: 'trainingProgram' },   // no effect if training program
            { id: 6, name: 'Brute-Force Attack on Login', power: 7, cost: 4, type: 'network', condition: 'twoFactorAuth' },     // no effect if 2FA
            { id: 7, name: 'Escalate Privileges', power: 10, cost: 6, type: 'network', condition: 'auditLogsOrTracks' },            // no effect if logs were audited and tracks not covered
            { id: 8, name: 'Cover tracks and Install Backdoor', power: 10, cost: 4, type: 'network' },
            { id: 9, name: 'Export files and introduce ransomware', power: 120, cost: 8, type: 'network', condition: 'serverShutdown' }, // no effect if servers shut down, win if still open
        ],
        defender: [
            { id: 10, name: 'Implement an Intrusion Detection System', power: 8, cost: 6, type: 'network'},
            { id: 11, name: 'Basic Employee Cybersecurity Training', power: 8, cost: 4, type: 'training' },
            { id: 12, name: 'Review Audit Logs', power: 6, cost: 2, type: 'server', condition: 'logsCovered' },                        // no effect if logs were covered
            { id: 13, name: 'Find backdoor and implement a Honeypot Server', power: 9, cost: 12, type: 'server', condition: 'backdoor' }, // attack stopped if backdoor (defender wins)
            { id: 14, name: 'Implement a Load Balancer', power: 5, cost: 2, type: 'network' },
            { id: 15, name: 'Shut Down, Detect and Restart Server', power: 20, cost: 20, type: 'network', condition: 'customerIssues' },      // stops all ongoing attacks but causes customer issues (news)
            { id: 16, name: 'Release a press release', power: 4, cost: 6, type: 'network', condition: 'customerIssuesApparent' },        // 9 power if already causing customer issues
            { id: 17, name: 'Implement Robust Patch Management processes', power: 9, cost: 5, type: 'network' },
            { id: 18, name: 'Two-Factor Authentication Rollout', power: 8, cost: 4, type: 'network' }, 
            { id: 19, name: 'Hire External Incident Response Team', power: 16, cost: 12, type: 'network' },
        ],
    };

    aMoney = 50;
    dMoney = 80;

    constructor(gameId) {
        this.turnNumber = 0;
        this.attackerMoney = aMoney;
        this.defenderMoney = dMoney;
        this.attackerMove = null;
        this.defenderMove = null;
        this.gameId = gameId;
        this.gameScore = 0;
        this.currentTurn = 'attacker';
        this.gameState = 'active';
        this.moves = this.getRandomMoves('attacker');
        this.moveHistory = [];
        this.powerHistory = [];
        this.conditions = {
            inputValidation: false,
            trainingProgram: false,
            loadBalancer: false,
            idsOrPatch: false,
            twoFactorAuth: false,
            auditLogs: false,
            serverShutdown: false,
            customerIssues: false,
        };
    }
    getRandomMoves(role, count = 4) {
        const availableMoves = [...this.MOVE_DICTIONARY[role]];
        count = Math.min(count, availableMoves.length);
        // Shuffle moves
        for (let i = availableMoves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableMoves[i], availableMoves[j]] = [availableMoves[j], availableMoves[i]];
        }
        // Return the first `count` moves
        return availableMoves.slice(0, count);
    }


    switchTurn() {
        this.currentTurn = this.currentTurn === 'attacker' ? 'defender' : 'attacker';
        this.moves = this.getRandomMoves(this.currentTurn);
    }

    performMove(role, moveId) {
        this.turnNumber++;

        const move = this.moves.find(m => m.id === moveId);
        if (!move) {
            return 'Invalid move!';
        }

        if (role === 'attacker' && this.attackerMoney < move.cost) {
            return 'Attacker does not have enough money!';
        }

        if (role === 'defender' && this.defenderMoney < move.cost) {
            return 'Defender does not have enough money!';
        }

        if (role === 'attacker') {
            this.attackerMoney -= move.cost;
            this.attackerMove = move;
        } else {
            this.defenderMoney -= move.cost;
            this.defenderMove = move;
        }

        this.moveHistory.push({ role, move });

        if (this.turnNumber % 2 === 0) {
            const attackerPower = this.applyMoveLogic(this.attackerMove, 'attacker');
            const defenderPower = this.applyMoveLogic(this.defenderMove, 'defender');
            this.gameScore += attackerPower - defenderPower;
        }

        if (this.gameScore >= 60) {
            return this.endGame('attackers');
        } else if (this.gameScore <= -60) {
            return this.endGame('defenders');
        }

        this.switchTurn();
        return 'Move successful!';
    }

    applyMoveLogic(move, role) {
        const { condition, power } = move;
        if (this.conditions[condition]) {
            if (role === 'attacker') {
                if ((condition === 'auditLogs' && this.moveExistsInHistory(12)) ||
                (condition === 'twoFactorAuth' && this.moveExistsInHistory(18)) ||
                (condition === 'serverShutdown' && this.moveExistsInHistory(15)) ||
                (condition === 'loadBalCustomerIssues' && this.moveExistsInHistory(14))) {
                    this.powerHistory.push(0);
                    return 0;
                }
                if ((condition === 'idsOrPatch' && (this.moveExistsInHistory(10) || this.moveExistsInHistory(17))) ||
                    (condition === 'trainingProgram' && this.moveExistsInHistory(11))) {
                    this.powerHistory.push(power - 7);
                    return power - 7;
                }
            } else if (role === 'defender') {
                if (condition === 'logsCovered' && this.moveExistsInHistory(8)) {
                    this.powerHistory.push(0);
                    return 0;
                }
                if (condition === 'backdoor' && this.moveExistsInHistory(8)) {
                    this.powerHistory.push(-120);
                    return 120;
                }
                if (condition === 'customerIssues' && (this.moveExistsInHistory(15)) || this.moveExistsInHistory(3)) {
                    this.powerHistory.push(- power + 2);
                    return power - 2;
                }
                if (condition === 'customerIssuesApparent' && (this.moveExistsInHistory(15) || this.moveExistsInHistory(3))) {
                    this.powerHistory.push(-9);
                    return 9;
                }
            }
        }
        return power;
    }

    moveExistsInHistory(moveId) {
        return this.moveHistory.some(
            (entry) => entry.move.id === moveId
        );
    }

    startGame() {
        if (this.players.attacker && this.players.defender) {
            this.gameState = 'active';
            return 'Game started!';
        }
        return 'Both roles need to be assigned!';
    }

    endGame(winner) {
        this.gameState = 'finished';
        return `Game over! The winner is ${winner}!`;
    }


}