
const express = require('express');
const router = express.Router();

const data = require('../data/data.js');
const game = data.codename;

router.get('/cards', (req, res) => {
    res.send({
        cards: game.cardList.cards,
    })
});

router.post('/cards/reset', (req, res) => {
    game.cardList.resetCards();
    res.send({message: 'success'});
});

router.post('/card/open', (req, res) => {
    const id = req.body.id;

    game.cardList.cards[id].hidden = false;

    res.send({message: 'success'});
});


module.exports = router;