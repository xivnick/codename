
const express = require('express');
const router = express.Router();

const data = require('../data/data.js');

router.get('/cards', (req, res) => {
    res.send({
        cards: data.cards,
    })
});

router.post('/cards/reset', (req, res) => {
    data.resetCards();
    res.send({message: 'success'});
});

router.post('/card/open', (req, res) => {
    const id = req.body.id;

    data.cards[id].hidden = false;

    res.send({message: 'success'});
});


module.exports = router;