import chalk from 'chalk'
import { prompt } from 'inquirer'

import {
  Domino,
  formatDominos,
  fromString,
  generateDominos,
  getLongestChain,
  isDouble,
  isEqual,
  toString,
} from './domino'

// const HAND_SIZE = 15
// const HIGHEST_DOUBLE = 12
// const NUMBER_OF_PLAYERS = 4
// const STATIONS = 8

let isFirstTurn = true
let startingDomino: Domino
let hand: Domino[]
// const trains = []

const takeTurn = async () => {
  const allDominos = generateDominos(12)

  if (!startingDomino) {
    const { startingDominoInput } = await prompt<{ startingDominoInput: string }>([
      {
        type: 'list',
        name: 'startingDominoInput',
        message: 'Please select the starting domino',
        choices: allDominos.filter(isDouble).map(toString),
      },
    ])
    startingDomino = fromString(startingDominoInput)
  }

  if (!hand) {
    const { handInput } = await prompt<{ handInput: string[] }>([
      {
        type: 'checkbox',
        name: 'handInput',
        message: 'Please select dominos in your hand',
        choices: allDominos.filter(d => !isEqual(d, startingDomino)).map(toString),
      },
    ])
    hand = handInput.map(fromString)
  }

  if (isFirstTurn) {
    isFirstTurn = false
    const longestChain = getLongestChain(startingDomino, hand)

    if (longestChain) {
      console.log(chalk.bold('Starting chain:'))
      console.log(chalk.blue(formatDominos(longestChain)))
    } else {
      console.log(chalk.grey('No possible starting chain'))
    }
  }
}

takeTurn().catch(console.error)
