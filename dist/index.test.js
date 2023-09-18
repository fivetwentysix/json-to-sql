"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
test("constructor only accepts an Array", () => {
    const subject = new _1.default([]);
    expect(subject.data).toEqual([]);
    expect(() => {
        new _1.default("foo");
    }).toThrowError("JsonToSql only accepts an Array");
    expect(() => {
        new _1.default({});
    }).toThrowError("JsonToSql only accepts an Array");
});
test("#structure() returns a Record describing the data", () => {
    const subject = new _1.default([
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
    const subject = new _1.default([
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
