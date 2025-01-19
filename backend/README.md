# Backend

Quickstart:

1. `npm install`
2. `npm start`

OTEHR

-   creating a game
    `curl -X POST http://localhost:3000/game/create \ -H "Content-Type: application/json" \ -d '{"playerId": "player1", "role": "attacker"}'`

-   joining a game
    `curl -X POST http://localhost:3000/game/join \ -H "Content-Type: application/json" \ -d '{"gameId": "GAME_ID", "playerId": "player2", "role": "defender"}'`

-   check game status `curl http://localhost:3000/game/GAME_ID`
