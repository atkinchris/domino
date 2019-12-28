type Domino = [number, number]

const reverseDomino = ([a, b]: Domino): Domino => [b, a]

const scoreDominos = (dominos: Domino[]): number => dominos.reduce((score, domino) => score + domino[0] + domino[1], 0)

const isEqual = (a: Domino, b: Domino): boolean => (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0])
const isDouble = ([a, b]: Domino): boolean => a === b
const toString = ([a, b]: Domino): string => `${a}|${b}`
const fromString = (str: string): Domino => str.split('|').map(value => parseInt(value, 10)) as Domino
const formatDominos = (dominos: Domino[]): string => dominos.map(toString).join(', ')

const generateDominos = (highestDouble: number): Domino[] => {
  const dominoes: Domino[] = []

  for (let n = 0; n <= highestDouble; n += 1) {
    for (let i = n; i <= highestDouble; i += 1) {
      dominoes.push([n, i])
    }
  }

  return dominoes
}

const getLongestChain = (startingDomino: Domino, hand: Domino[]): Domino[] | null => {
  const chains: Domino[][] = []
  const queue: Array<[Domino[], Domino[]]> = [[[startingDomino], hand]]
  let longestChain = 0
  let iterations = 10000

  const buildChain = (chain: Domino[], remaining: Domino[]) => {
    if (chain.length < longestChain) {
      return
    }

    chains.push(chain)

    const lastDomino = chain[chain.length - 1]

    remaining.forEach(nextDomino => {
      const others = remaining.filter(d => d !== nextDomino)

      if (nextDomino[0] === lastDomino[1]) {
        longestChain = chain.length + 1
        queue.push([[...chain, nextDomino], others])
        return
      }

      if (nextDomino[1] === lastDomino[1]) {
        longestChain = chain.length + 1
        queue.push([[...chain, reverseDomino(nextDomino)], others])
        return
      }
    })
  }

  while (queue.length > 0) {
    const next = queue.shift()!
    buildChain(next[0], next[1])
    iterations -= 1

    if (iterations === 0) {
      throw Error('Iteration limit reached - maybe not be optimal chain')
    }
  }

  if (chains.length === 1) {
    return null
  }

  const longestChains = chains
    .map(chain => ({ chain, score: scoreDominos(chain) }))
    .sort((a, b) => (a.score > b.score ? -1 : 1))

  return longestChains[0].chain.slice(1)
}

export {
  Domino,
  generateDominos,
  getLongestChain,
  isEqual,
  scoreDominos,
  formatDominos,
  toString,
  fromString,
  isDouble,
}
