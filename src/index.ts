import { knuthShuffle } from 'knuth-shuffle'

type Domino = [number, number]

const generateDominos = (highestDouble: number): Domino[] => {
  const dominoes: Domino[] = []

  for (let n = 0; n <= highestDouble; n += 1) {
    for (let i = n; i <= highestDouble; i += 1) {
      dominoes.push([n, i])
    }
  }

  return dominoes
}

const fullSet = generateDominos(6)

knuthShuffle(fullSet)

console.log(fullSet)
