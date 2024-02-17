it('renders a grid of rows of columns', async () => {
  const fixture = new Col(
    new Row(
      new Block(1, 2),
      new Block(3, 4)
    ),
    new Row(
      new Block(1, 2),
      new Col(
        new Block(3, 4),
        new Block(2, 3)
      )
    )
  )
  fixture.place(0, 0)
  assert.deepStrictEqual(
    render(fixture),
    [
      'bddd',
      'bddd',
      'cddd',
      'cddd',
      'ehhh',
      'ehhh',
      'ehhh',
      'ehhh',
      'eiig',
      'fiig',
      'fiig'
    ].join('\n')
  )
})