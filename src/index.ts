import playGame from './game'

const HAND_SIZE = 15
const HIGHEST_DOUBLE = 12
const NUMBER_OF_PLAYERS = 4
const STATIONS = 8

const MAX_ITERATIONS = 1000
let scores
let iteration = 0

do {
  iteration += 1
  scores = playGame({
    handSize: HAND_SIZE,
    highestDouble: HIGHEST_DOUBLE,
    numberOfPlayers: NUMBER_OF_PLAYERS,
    stations: STATIONS,
  })
} while (!scores && iteration < MAX_ITERATIONS)

console.log(`Game finished on iteration: ${iteration}`)
console.log(scores)
