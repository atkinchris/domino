type Domino = [number, number]

const reverseDomino = ([a, b]: Domino): Domino => [b, a]

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

const getLongestChain = (startingDomino: Domino, hand: Domino[]): Domino[] => {
  const chains: Domino[][] = []

  const buildChain = (chain: Domino[], remaining: Domino[]) => {
    chains.push(chain)
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

  return chains.sort((a, b) => (a.length > b.length ? -1 : 1))[0]
}

export { Domino, generateDominos, getLongestChain, isEqual }
