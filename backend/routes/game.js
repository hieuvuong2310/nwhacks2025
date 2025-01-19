const express = require('express');
const router = express.Router();
const GameManager = require('../models/GameManager');

// Create a new game
router.post('/create', (req, res) => {
    const { playerId, role } = req.body;

    if (!playerId || !role) {
        return res.status(400).json({
            success: false,
            message: 'PlayerId and role are required',
        });
    }

    if (role !== 'attacker' && role !== 'defender') {
        return res.status(400).json({
            success: false,
            message: 'Role must be either attacker or defender',
        });
    }

    const gameId = GameManager.createGame();
    const joined = GameManager.joinGame(gameId, playerId, role);

    if (!joined) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create game',
        });
    }

    res.json({
        success: true,
        gameId: gameId,
        role: role,
    });
});

// Join an existing game
router.post('/join', (req, res) => {
    const { gameId, playerId, role } = req.body;

    if (!gameId || !playerId || !role) {
        return res.status(400).json({
            success: false,
            message: 'GameId, playerId, and role are required',
        });
    }

    if (role !== 'attacker' && role !== 'defender') {
        return res.status(400).json({
            success: false,
            message: 'Role must be either attacker or defender',
        });
    }

    const joined = GameManager.joinGame(gameId, playerId, role);

    if (!joined) {
        return res.status(400).json({
            success: false,
            message:
                'Failed to join game. Game might not exist or role already taken.',
        });
    }

    const game = GameManager.getGame(gameId);

    res.json({
        success: true,
        gameId: gameId,
        role: role,
        gameState: game.gameState,
    });
});

// Get game state
router.get('/:gameId', (req, res) => {
    const game = GameManager.getGame(req.params.gameId);

    if (!game) {
        return res.status(404).json({
            success: false,
            message: 'Game not found',
        });
    }

    res.json({
        success: true,
        game: game,
    });
});

module.exports = router;
