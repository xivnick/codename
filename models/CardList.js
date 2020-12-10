
const wordData = require('../data/words.json').words;
const constants = require('../constants');
const tools = require('../tools');

class CardList {
    constructor() {
        this.cards = [];

        this.resetCards();
    }

    coverCard(cardID) {
        if(this.cards[cardID].covered) return null;
        this.cards[cardID].covered = true;
        return this.cards[cardID].type;
    }

    getFilteredCards() {
        let filteredCards = [];

        for(let card of this.cards){
            if(!card.covered) filteredCards.push({
                id: card.id,
                word: card.word,
                type: null,
                covered: false,
            });
            else filteredCards.push(card);
        }

        return filteredCards;
    }

    countType(type) {
        let cnt = 0;

        for(let card of this.cards){
            if(card.type === type && !card.covered) cnt++;
        }

        return cnt;
    }

    resetCards() {
        let ids = [];
        for(let i = 0; i < 25; i++){
            let new_id = tools.getRandomInt(0, wordData.length);

            while(ids.includes(new_id)) new_id = tools.getRandomInt(0, wordData.length);

            ids.push(new_id);
        }

        let words = [];
        for(let id of ids){
            words.push(wordData[id]);
        }

        let types = [constants.ASSASSIN];
        for(let i = 0; i < 8; i++) types.push(constants.RED);
        for(let i = 0; i < 8; i++) types.push(constants.BLUE);
        for(let i = 0; i < 7; i++) types.push(constants.BYSTANDER);

        if(Math.random() < 0.5) types.push(constants.RED);
        else types.push(constants.BLUE);

        types = tools.shuffleArray(types);

        this.cards.length = 0;
        for(let i = 0; i < 25; i++){
            this.cards.push({
                id: i,
                word: words[i],
                type: types[i],
                covered: false,
            });
        }
    }
}

module.exports = CardList;