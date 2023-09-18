import JsonToSql from '.'

test('constructor only accepts an Array', () => {
  const subject = new JsonToSql([])
  expect(subject.data).toEqual([])

  expect(() => {
    new JsonToSql('foo')
  }).toThrowError('JsonToSql only accepts an Array')

  expect(() => {
    new JsonToSql({})
  }).toThrowError('JsonToSql only accepts an Array')
})