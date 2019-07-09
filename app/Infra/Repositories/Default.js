'use strict'

const Database = use('Database')

class DefaultRepository {
    rawJsonContains(index, value, column = "data") {
        return Database.raw(`JSON_CONTAINS(${column}, '${value}', '$.${index}[0]') = ?`, [value]);
    }

    rawJsonExtract(index, value, column = "data") {
        return Database.raw(`LOWER(JSON_EXTRACT(${column}, "$.${index}"))  LIKE ?`, [`%${value}%`]);
    }

    queryWhereRaw(model, raw) {
        return model.query().whereRaw(raw);
    }
}

module.exports = DefaultRepository
