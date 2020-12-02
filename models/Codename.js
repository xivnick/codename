
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

        this.hint = null;
        this.hintCnt = null;

        this.logs = [];
    }

    softReset() {
        this.cardList.resetCards();
        this.win = null;

        this.turn = this.countType(constants.BLUE) > this.countType(constants.RED) ? constants.BLUE : constants.RED;

        this.logs = [];
    }

    pickCard(cardID, userName) {
        this.logs.push(`${userName}이(가) ${this.cardList.cards[cardID].word}을(를) 선택했습니다.`);
        let coverType = this.cardList.coverCard(cardID);

        if(coverType === null) return null;
        if(coverType === constants.ASSASSIN) return this.win = tools.reverseColor(this.turn);
        if(coverType !== constants.BYSTANDER && this.countType(coverType) === 0) return this.win = coverType;

        // TODO: check hintCnt
        if(coverType !== this.turn) this.turn = tools.reverseColor(this.turn);
    }

    countType(type) {
        return this.cardList.countType(type);
    }

    getPlayerTeam(userName){
        for(let teamName in this.teams){
            if(this.teams[teamName][MASTER].includes(userName)) return teamName;
            if(this.teams[teamName][PLAYER].includes(userName)) return teamName;
        }
    }

    isPlayerMaster(userName){
        for(let team of this.teams){
            if(team[MASTER].includes(userName)) return true;
        }
        return false;
    }

    removePlayer(userName){
        for(let team of this.teams){
            for(let userList of team){
                tools.removeElement(userList, userName);
            }
        }
    }
    addPlayer(userName, teamName, type){
        this.teams[teamName][type].push(userName);
    }
}

module.exports = Codename;