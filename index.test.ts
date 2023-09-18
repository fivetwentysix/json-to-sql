import JsonToSql from ".";

test("constructor only accepts an Array", () => {
  const subject = new JsonToSql([]);
  expect(subject.data).toEqual([]);

  expect(() => {
    new JsonToSql("foo");
  }).toThrowError("JsonToSql only accepts an Array");

  expect(() => {
    new JsonToSql({});
  }).toThrowError("JsonToSql only accepts an Array");
});

test("#structure() returns a Record describing the data", () => {
  const subject = new JsonToSql([
    { id: 1, key: "a", name: "foo" },
    { id: 2, key: "b", name: null },
    { id: 3, key: "c", name: null, address: "bar" },
    { id: 4, key: "d", example: true },
  ]);

  expect(subject.structure()).toEqual([
    { name: "id", type: "number", nullable: false },
    { name: "key", type: "string", nullable: false },
    { name: "name", type: "string", nullable: true },
    { name: "address", type: "string", nullable: true },
    { name: "example", type: "boolean", nullable: true },
  ]);
});

test("#toSqlTable() returns a CREATE TABLE statement", () => {
  const subject = new JsonToSql([
    { id: 1, key: "a", name: "foo" },
    { id: 2, key: "b", name: null },
  ]);

  const expectation = `CREATE TABLE users (
  id INTEGER NOT NULL,
  key TEXT NOT NULL,
  name TEXT NULL
);`;
  expect(subject.toSqlTable("users")).toEqual(expectation);
});
