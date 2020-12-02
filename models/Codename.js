
const constants = require('../constants');
const tools = require('../tools');
const CardList = require('../models/CardList');

const MASTER = 'master';
const PLAYER = 'player';

class Codename {
    constructor() {
        this.cardList = new CardList();
        this.win = null;

        this.turn = this.countType(constants.BLUE) > this.countType(constants.RED) ? constants.BLUE : constants.RED;
        this.teams = {};
        this.teams[constants.BLUE] = {MASTER: [], PLAYER: []};
        this.teams[constants.RED] = {MASTER: [], PLAYER: []};
    }

    resetCards() {
        this.cardList.resetCards();
        this.win = null;

        this.turn = this.countType(constants.BLUE) > this.countType(constants.RED) ? constants.BLUE : constants.RED;
    }

    openCard(cardID) {
        let openType = this.cardList.openCard(cardID);

        if(openType === constants.ASSASSIN) return this.win = tools.reverseColor(this.turn);
        if(openType !== constants.BYSTANDER && this.countType(openType) === 0) return this.win = openType;

        // TODO: check hintCnt
        if(openType !== this.turn) this.turn = tools.reverseColor(this.turn);
    }

    countType(type) {
        return this.cardList.countType(type);
    }

    getPlayerTeam(playerID){
        for(let teamName in this.teams){
            if(this.teams[teamName][MASTER].includes(playerID)) return teamName;
            if(this.teams[teamName][PLAYER].includes(playerID)) return teamName;
        }
    }

    isPlayerMaster(playerID){
        for(let team of this.teams){
            if(team[MASTER].includes(playerID)) return true;
        }
        return false;
    }
}

module.exports = Codename;