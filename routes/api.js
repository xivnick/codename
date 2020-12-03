
const express = require('express');
const router = express.Router();

const data = require('../data/data.js');
const game = data.codename;

router.get('/game', (req, res) => {
    const userName = req.query.userName;

    res.send({
        game: game,
        team: game.getPlayerTeam(userName),
        master: game.isPlayerMaster(userName),
    })
});

router.get('/cards', (req, res) => {
    res.send({
        cards: game.cardList.cards,
    })
});

router.post('/cards/reset', (req, res) => {
    game.softReset();
    res.send({message: 'success'});
});

router.post('/card/pick', (req, res) => {
    const cardID = req.body.cardID;
    const userName = req.body.userName;

    game.pickCard(cardID, userName);

    res.send({message: 'success'});
});

router.post('/user/team', (req, res) => {
    const userName = req.body.userName;
    const team = req.body.team;
    const type = req.body.type || 'player';

    game.removePlayer(userName);
    game.addPlayer(userName, team, type);

    res.send({message: 'success'});
});

router.post('/hint', (req, res) => {
    const userName = req.body.userName;
    const hint = req.body.hint;
    const hintNum = req.body.hintNum;

    if(!game.isPlayerMaster(userName)) return res.status(403).send();
    if(game.getPlayerTeam(userName) !== game.turn) return res.status(403).send();
    if(game.hint !== null) return res.status(403).send();

    game.hint = hint;
    game.hintNum = hintNum;
    game.hintCnt = hintNum > 0 ? hintNum + 1 : -1;

    res.send({message: 'success'});
})

module.exports = router;