
const express = require('express');
const router = express.Router();

const data = require('../data/data.js');
const game = data.codename;

router.get('/game', (req, res) => {
    res.send({
        game: game,
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
});


module.exports = router;