var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const cors = require('cors');

router.use(cors());

// generating a random 6-character string
function generateGameId() {
    return crypto.randomBytes(3).toString('hex');
}

// Create a new game
router.post('/create', function (req, res) {
    const gameId = generateGameId();

    const newGame = {
        id: gameId,
        attacker:
    };

    req.app.locals.games.push(newGame);
    console.log('Current games:', req.app.locals.games);
    res.json({ gameId: gameId });
});

module.exports = router;
