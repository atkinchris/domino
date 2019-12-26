import { knuthShuffle } from 'knuth-shuffle'

import { Domino, generateDominos, getLongestChain, isEqual } from './domino'

interface Config {
  handSize: number
  highestDouble: number
  numberOfPlayers: number
  stations: number
}

interface Player {
  id: number
  hand: Domino[]
}

interface Train {
  player: number | null
  dominos: Domino[]
}

interface Result {
  player: number
  score: number
}

const isWon = (players: Player[]) => players.some(({ hand }) => hand.length === 0)
const getScores = (players: Player[]): Result[] =>
  players.map(player => ({
    player: player.id,
    score: player.hand.reduce((score, domino) => score + domino[0] + domino[1], 0),
  }))

const playGame = ({ handSize, highestDouble, numberOfPlayers, stations }: Config) => {
  const boneyard = generateDominos(highestDouble)
  const startingDomino = boneyard.splice(0, 1)[0]

  knuthShuffle(boneyard)

  const trains: Train[] = Array(stations)
    .fill(undefined)
    .map(() => ({
      player: null,
      dominos: [],
    }))

  const players: Player[] = Array(numberOfPlayers)
    .fill(undefined)
    .map((_, index) => ({
      id: index,
      hand: boneyard.splice(-handSize),
    }))

  players.forEach(({ id, hand }) => {
    const chain = getLongestChain(startingDomino, hand)

    if (chain.length > 1) {
      const fromHand = chain.slice(1)
      const train = trains[id]

      train.player = id
      fromHand.forEach(domino => {
        train.dominos.push(domino)

        const handIndex = hand.findIndex(dominoHand => isEqual(dominoHand, domino))
        hand.splice(handIndex, 1)
      })
    }
  })

  if (isWon(players)) {
    return getScores(players)
  }
}

export default playGame
