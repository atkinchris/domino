import { Domino, getLongestChain } from '../domino'

describe('domino', () => {
  describe('getLongestChain', () => {
    it('gets a chain from a hand and starting domino', () => {
      const hand: Domino[] = [
        [3, 3],
        [1, 2],
        [2, 2],
        [2, 3],
        [1, 1],
        [0, 1],
      ]
      const startingDomino: Domino = [0, 0]
      const longestChain = getLongestChain(startingDomino, hand)

      expect(longestChain).toEqual([
        [0, 1],
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3],
        [3, 3],
      ])
    })

    it('builds chains by flipping dominos as required', () => {
      const hand: Domino[] = [
        [3, 3],
        [2, 1],
        [2, 2],
        [3, 2],
        [1, 1],
        [1, 0],
      ]
      const startingDomino: Domino = [0, 0]
      const longestChain = getLongestChain(startingDomino, hand)

      expect(longestChain).toEqual([
        [0, 1],
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3],
        [3, 3],
      ])
    })

    it('returns "null" if there is no possible chain', () => {
      const hand: Domino[] = [
        [1, 2],
        [2, 2],
        [1, 1],
        [2, 3],
      ]
      const startingDomino: Domino = [0, 0]
      const longestChain = getLongestChain(startingDomino, hand)

      expect(longestChain).toEqual(null)
    })
  })
})
