export default class JsonToSql {
  data: Array<any>;
  constructor(data: any) {
    this.data = data;
    if (!Array.isArray(data)) {
      throw new InvalidParameterError("JsonToSql only accepts an Array");
    }
  }

  structure() {
    const result: TableStructure = {};
    let i = 0;

    this.data.forEach((row) => {
      Object.keys(row).forEach((key) => {
        const value = row[key];
        const type = typeof value;
        const nullable =
          result[key]?.nullable ||
          value === null ||
          (i > 0 && result[key] === undefined);
        const column = { name: key, type, nullable };

        if (result[key]) {
          if (result[key].type !== type) {
            result[key].type = "string";
          }

          result[key].nullable = result[key].nullable || nullable;
        } else {
          result[key] = column;
        }
      });

      i++;
    });
    return Object.values(result);
  }

  toSqlTable(name: string) {
    const columns = this.structure()
      .map((column) => {
        const { name, type, nullable } = column;
        const nullability = nullable ? "NULL" : "NOT NULL";
        return `  ${name} ${this.convertType(type)} ${nullability}`;
      })
      .join(",\n");

    return `CREATE TABLE ${name} (
${columns}
);`;
  }

  private convertType(type: string) {
    if (type === "number") {
      return "INTEGER";
    }

    if (type === "string") {
      return "TEXT";
    }

    if (type === "object") {
      return "TEXT";
    }

    return type.toUpperCase();
  }
}

class InvalidParameterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidParameterError";
  }
}

type TableStructure = Record<string, ColumnStructure>;
type ColumnStructure = {
  name: string;
  type: string;
  nullable: boolean;
};
