
const constants = require('../constants');
const CardList = require('../models/CardList');

class Codename {
    constructor() {
        this.cardList = new CardList();
        this.win = null;

        this.turn = this.countType(constants.BLUE) > this.countType(constants.RED) ? constants.BLUE : constants.RED;
    }

    countType(type) {
        this.cardList.countType(type);
    }
}

module.exports = Codename;