class GameManager {
    constructor() {
        this.games = new Map();
    }

    createGame() {
        const gameId = Math.random().toString(36).substring(2, 15);
        const game = new Game(gameId);
        this.games.set(gameId, game);
        return gameId;
    }

    getGame(gameId) {
        return this.games.get(gameId);
    }

    joinGame(gameId, playerId, role) {
        const game = this.games.get(gameId);
        if (!game) return null;

        if (!game.players[role]) {
            game.players[role] = playerId;
            if (game.players.attacker && game.players.defender) {
                game.gameState = 'active';
            }
            return true;
        }
        return false;
    }
}

module.exports = new GameManager();
