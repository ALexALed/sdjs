import { assert } from 'chai';
import { WrappedRow as Row, WrappedBlock as Block } from './wrapped.js'

it("wrap a row of two blocks that do not fit on one row", async () => {
  const fixture = new Row(3, new Block(2, 1), new Block(2, 1));
  const wrapped = fixture.wrap();
  wrapped.place(0, 0);
  assert.deepStrictEqual(wrapped.report(), [
    "row",
    0,
    0,
    2,
    2,
    [
      "col",
      0,
      0,
      2,
      2,
      ["row", 0, 0, 2, 1, ["block", 0, 0, 2, 1]],
      ["row", 0, 1, 2, 2, ["block", 0, 1, 2, 2]],
    ],
  ]);
});
