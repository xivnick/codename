
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
    game.resetCards();
    res.send({message: 'success'});
});

router.post('/card/open', (req, res) => {
    const cardID = req.body.cardID;

    game.openCard(cardID);

    res.send({message: 'success'});
});


module.exports = router;