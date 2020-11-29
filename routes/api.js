
const express = require('express');
const router = express.Router();

const data = require('../data/data.js');

router.get('/cards', (req, res) => {
    res.send({
        cards: data.cards,
    })
});

module.exports = router;