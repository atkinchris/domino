type Domino = [number, number]

const reverseDomino = ([a, b]: Domino): Domino => [b, a]

const scoreDominos = (dominos: Domino[]): number => dominos.reduce((score, domino) => score + domino[0] + domino[1], 0)

const isEqual = (a: Domino, b: Domino): boolean => (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0])

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

  const buildChain = (chain: Domino[], remaining: Domino[]) => {
    if (chain.length > 1) {
      chains.push(chain)
    }

    const lastDomino = chain[chain.length - 1]

    remaining.forEach(nextDomino => {
      const others = remaining.filter(d => d !== nextDomino)

      if (nextDomino[0] === lastDomino[1]) {
        buildChain([...chain, nextDomino], others)
      }

      if (nextDomino[1] === lastDomino[1]) {
        buildChain([...chain, reverseDomino(nextDomino)], others)
      }
    })
  }

  buildChain([startingDomino], hand)

  if (chains.length === 0) {
    return null
  }

  const longestChains = chains
    .map(chain => chain.slice(1))
    .filter((chain, _, array) => chain.length === Math.max(...array.map(c => c.length)))
    .map(chain => ({
      chain,
      remainingScore: scoreDominos(hand.filter(d => chain.find(cd => isEqual(d, cd)) === null)),
    }))
    .sort((a, b) => (a.remainingScore > b.remainingScore ? -1 : 1))
    .map(({ chain }) => chain)

  return longestChains[0]
}

export { Domino, generateDominos, getLongestChain, isEqual }
