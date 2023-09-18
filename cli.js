#!/usr/bin/env node

const [, , ...args] = process.argv;

const tableName = args[0];
const filePath = args[1];

if (!tableName || !filePath) {
  console.error("Usage: make-sql-table <tableName> <filePath>");
  process.exit(1);
}

const fs = require("fs");
const path = require("path");
const jsonToSql = require("./dist/index").default;

const file = path.resolve(process.cwd(), filePath);

fs.readFile(file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const converter = new jsonToSql(JSON.parse(data));

  console.log(converter.toSqlTable(tableName));
});