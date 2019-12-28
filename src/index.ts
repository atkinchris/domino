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
const HIGHEST_DOUBLE = 6
const NUMBER_OF_PLAYERS = 4
// const STATIONS = 8

let hand: Domino[]
let startingDomino: Domino
const chains: Domino[][] = []

const takeTurn = async () => {
  const allDominos = generateDominos(HIGHEST_DOUBLE)

  const getAvailableDominos = () => {
    const allocatedDominos = [...chains, hand, [startingDomino]].filter(Boolean)
    return allDominos.filter(domino => !allocatedDominos.some(chain => chain.find(d => isEqual(d, domino))))
  }

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
        choices: getAvailableDominos().map(toString),
      },
    ])
    hand = handInput.map(fromString)
  }

  if (chains[0] === undefined) {
    const longestChain = getLongestChain(startingDomino, hand)

    if (longestChain) {
      console.log(chalk.bold('Starting chain:'))
      console.log(chalk.blue(formatDominos(longestChain)))
      console.log(chalk.grey('Assigning chain to first slot'))

      chains[0] = longestChain
    } else {
      console.log(chalk.grey('No possible starting chain'))
      console.log(chalk.grey('Assigning empty chain to first slot'))

      chains[0] = []
    }
  }

  for (let i = 2; i <= NUMBER_OF_PLAYERS; i += 1) {
    if (chains[i - 1] !== undefined) continue

    const { chainElementsInput } = await prompt<{ chainElementsInput: string[] }>([
      {
        type: 'checkbox',
        name: 'chainElementsInput',
        message: `Please select starting chain for player ${i}`,
        choices: getAvailableDominos().map(toString),
      },
    ])
    const chainElements = chainElementsInput.map(fromString)

    if (chainElements.length === 0) {
      chains[i - 1] = []
      continue
    }

    const { lastDominoInput } = await prompt<{ lastDominoInput: string }>([
      {
        type: 'list',
        name: 'lastDominoInput',
        message: `Please select tail domino for player ${i}`,
        choices: chainElements.map(toString),
      },
    ])
    const lastDomino = fromString(lastDominoInput)

    chains[i - 1] = chainElements.filter(c => isEqual(c, lastDomino)).concat([lastDomino])
  }
}

takeTurn().catch(console.error)
