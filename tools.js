
const constants = require('./constants');

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const shuffleArray = (arr) => {
    return arr.map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
};

const reverseColor = (color) => {
    if(color === constants.BLUE) return constants.RED;
    else return constants.BLUE;
};

const removeElement = (arr, value) => {
    while(arr.includes(value)){
        arr.splice(arr.indexOf(value), 1);
    }
};

module.exports = {
    getRandomInt,
    shuffleArray,
    reverseColor,
    removeElement,
};