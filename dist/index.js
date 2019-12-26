"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knuth_shuffle_1 = require("knuth-shuffle");
const generateDominos = (highestDouble) => {
    const dominoes = [];
    for (let n = 0; n <= highestDouble; n += 1) {
        for (let i = n; i <= highestDouble; i += 1) {
            dominoes.push([n, i]);
        }
    }
    return dominoes;
};
const fullSet = generateDominos(6);
knuth_shuffle_1.knuthShuffle(fullSet);
console.log(fullSet);
//# sourceMappingURL=index.js.map