
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
        this.teams[constants.BLUE] = {master: [], player: []};
        this.teams[constants.RED] = {master: [], player: []};

        this.hint = null;
        this.hintNum = null;
        this.hintCnt = 0;

        this.logs = [];
    }

    softReset() {
        this.cardList.resetCards();
        this.win = null;

        this.turn = this.countType(constants.BLUE) > this.countType(constants.RED) ? constants.BLUE : constants.RED;

        this.logs = [];
    }

    pickCard(cardID, userName) {
        this.logs.push(`${userName} - ${this.cardList.cards[cardID].word} 카드를 선택했습니다.`);
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
        return null;
    }

    isPlayerMaster(userName){
        for(let team of Object.values(this.teams)){
            if(team[MASTER].includes(userName)) return true;
        }
        return false;
    }

    removePlayer(userName){
        for(let team of Object.values(this.teams)){
            for(let userList of Object.values(team)){
                tools.removeElement(userList, userName);
            }
        }
    }
    addPlayer(userName, teamName, type){
        this.teams[teamName][type].push(userName);
    }
}

module.exports = Codename;