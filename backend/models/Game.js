class Game {
    constructor(gameId) {
        this.gameId = gameId;
        this.players = {
            attacker: null,
            defender: null,
        };
        this.currentTurn = 'attacker';
        this.gameState = 'waiting'; // waiting, active, finished
        this.moves = {
            attacker: [
                { id: 1, name: 'SQL Injection', power: 8, type: 'database' },
                { id: 2, name: 'Phishing Attack', power: 6, type: 'social' },
                { id: 3, name: 'DDoS', power: 7, type: 'network' },
            ],
            defender: [
                { id: 1, name: 'Firewall', power: 7, type: 'network' },
                { id: 2, name: 'Input Validation', power: 8, type: 'database' },
                { id: 3, name: 'Security Training', power: 6, type: 'social' },
            ],
        };
        this.moveHistory = [];
    }
}

module.exports = Game;
