export class Game {

    MOVE_DICTIONARY = {
        attacker: [
            { id: 1, name: 'SQL Injection', power: 3, cost: 2, type: 'database' },                // no effect if input validation
            { id: 2, name: 'Targeted Phishing Attack', power: 9, cost: 5, type: 'social' },        // subtract 7 if training program
            { id: 3, name: 'Distributed Denial of Service Attack (DDoS)', power: 9, cost: 4, type: 'network' },    // no effect if load balancer
            { id: 4, name: 'Zero Day Exploit', power: 15, cost: 10, type: 'network' },              // subtract 5 if IDS or 7 if patch management
            { id: 5, name: 'USB Scattering in Parking Lot', power: 6, cost: 2, type: 'network' },   // no effect if training program
            { id: 6, name: 'Brute-Force Attack on Login', power: 7, cost: 4, type: 'network' },     // no effect if 2FA
            { id: 7, name: 'Escalate Privileges', power: 10, cost: 6, type: 'network' },            // no effect if logs were audited and tracks not covered
            { id: 8, name: 'Cover tracks and Install Backdoor', power: 10, cost: 4, type: 'network' },
            { id: 9, name: 'Export files and introduce ransomware', power: 100, cost: 5, type: 'network' }, // no effect if servers shut down, win if still open
        ],
        defender: [
            { id: 1, name: 'Implement an Intrusion Detection System', power: 10, cost: 6, type: 'network' },    // subtract 3 if attackers already in
            { id: 2, name: 'Basic Employee Cybersecurity Training', power: 8, cost: 4, type: 'training' },
            { id: 3, name: 'Review Audit Logs', power: 6, cost: 2, type: 'server' },                        // no effect if logs were covered
            { id: 4, name: 'Find backdoor and implement a Honeypot Server', power: 9, cost: 12, type: 'server' }, // attack stopped if backdoor (defender wins)
            { id: 5, name: 'Implement a Load Balancer', power: 5, cost: 2, type: 'network' },
            { id: 6, name: 'Shut Down, Detect and Restart Server', power: 20, cost: 20, type: 'network' },      // stops all ongoing attacks but causes customer issues (news)
            { id: 7, name: 'Release a press release', power: 5, cost: 6, type: 'network' },        // only 2 cost if already causing customer issues
            { id: 8, name: 'Implement Robust Patch Management processes', power: 9, cost: 5, type: 'network' },
            { id: 9, name: 'Two-Factor Authentication Rollout', power: 8, cost: 4, type: 'network' }, 
            { id: 10, name: 'Hire External Incident Response Team', power: 16, cost: 12, type: 'network' },
        ],
    };

    constructor(gameId) {
        this.gameId = gameId;
        this.gameScore = 0;
        this.players = {
            attacker: null,
            defender: null,
        };
        this.currentTurn = 'attacker';
        this.gameState = 'waiting';
        this.moves = this.MOVE_DICTIONARY.attacker;
        this.moveHistory = [];
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === 'attacker' ? 'defender' : 'attacker';
    }

    performMove(role, moveId) {
        if (this.currentTurn !== role) {
            return 'Not your turn!';
        }

        const move = this.moves[role].find(m => m.id === moveId);
        if (!move) {
            return 'Invalid move!';
        }

        this.moveHistory.push({ role, move });
        this.switchTurn();

        this.gameScore += role === 'attacker' ? move.power : -move.power;
        return `${role} used ${move.name} (${move.type}) with power ${move.power}`;
    }

    startGame() {
        if (this.players.attacker && this.players.defender) {
            this.gameState = 'active';
            return 'Game started!';
        }
        return 'Both roles need to be assigned!';
    }

    endGame() {
        this.gameState = 'finished';
        return `Game over! Final Score: ${this.gameScore}`;
    }


}