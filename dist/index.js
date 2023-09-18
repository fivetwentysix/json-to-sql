"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonToSql {
    constructor(data) {
        this.data = data;
        if (!Array.isArray(data)) {
            throw new InvalidParameterError("JsonToSql only accepts an Array");
        }
    }
    structure() {
        const result = {};
        let i = 0;
        this.data.forEach((row) => {
            Object.keys(row).forEach((key) => {
                var _a;
                const value = row[key];
                const type = typeof value;
                const nullable = ((_a = result[key]) === null || _a === void 0 ? void 0 : _a.nullable) ||
                    value === null ||
                    (i > 0 && result[key] === undefined);
                const column = { name: key, type, nullable };
                if (result[key]) {
                    if (result[key].type !== type) {
                        result[key].type = "string";
                    }
                    result[key].nullable = result[key].nullable || nullable;
                }
                else {
                    result[key] = column;
                }
            });
            i++;
        });
        return Object.values(result);
    }
    toSqlTable(name) {
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
    convertType(type) {
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
exports.default = JsonToSql;
class InvalidParameterError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidParameterError";
    }
}
