'use strict'

const Database = use('Database')

class DefaultRepository {
    rawJson(index, value, column = "data") {
        return Database.raw(`JSON_EXTRACT(${column}, "$.${index}") = ?`, [value]);
    }

    queryWhereRaw(model, raw) {
        return model.query().whereRaw(raw);
    }
}

module.exports = DefaultRepository
