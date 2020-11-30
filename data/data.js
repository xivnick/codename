
const wordData = require('./words.json').words;
const constants = require('./constants');

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const shuffleArray = (arr) => {
    return arr.map(a => [Math.random(), a])
              .sort((a, b) => a[0] - b[0])
              .map(a => a[1]);
};

let cards = [];

const resetCards = () => {

    console.log('resetCards called!');

    let ids = [];
    for(let i = 0; i < 25; i++){
        let new_id = getRandomInt(0, wordData.length);

        while(new_id in ids) new_id = getRandomInt(0, wordData.length);

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

    types = shuffleArray(types);

    cards.length = 0;
    for(let i = 0; i < 25; i++){
        cards.push({
            id: i,
            word: words[i],
            type: types[i],
            hidden: true,
        });
    }
};

resetCards();

module.exports = {
    cards,
    resetCards,
};

