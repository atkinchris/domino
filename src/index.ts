import { knuthShuffle } from 'knuth-shuffle'

import { generateDominos, getLongestChain } from './domino'

const HIGHEST_DOUBLE = 6
const HAND_SIZE = 8

const fullSet = generateDominos(HIGHEST_DOUBLE)
knuthShuffle(fullSet)

const startingDomino = fullSet.splice(0, 1)[0]
const hand = fullSet.splice(-HAND_SIZE)
const longestChain = getLongestChain(startingDomino, hand)

console.log(longestChain)
