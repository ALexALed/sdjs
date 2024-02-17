import assert from 'assert'

import {
  PlacedBlock as Block,
  PlacedCol as Col,
  PlacedRow as Row
} from './placed.js'

describe('places blocks', () => {
  it('places a single unit block', async () => {
    const fixture = new Block(1, 1)
    fixture.place(0, 0)
    assert.deepStrictEqual(
      fixture.report(),
      ['block', 0, 0, 1, 1]
    )
  })

  it('places a large block', async () => {
    const fixture = new Block(3, 4)
    fixture.place(0, 0)
    assert.deepStrictEqual(
      fixture.report(),
      ['block', 0, 0, 3, 4]
    )
  })

  it('places a row of two blocks', async () => {
    const fixture = new Row(
      new Block(1, 1),
      new Block(2, 4)
    )
    fixture.place(0, 0)
    assert.deepStrictEqual(
      fixture.report(),
      ['row', 0, 0, 3, 4,
        ['block', 0, 3, 1, 4],
        ['block', 1, 0, 3, 4]
      ]
    )
  })

})
