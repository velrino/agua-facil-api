'use strict'

const Database = use('Database')
const Model = use('Model')

class DefaultRepository extends Model {
    rawJsonContains(index, value, column = "data") {
        return Database.raw(`JSON_CONTAINS(${column}, '${value}', '$.${index}') IN (?)`, [value]);
    }

    rawJsonExtract(index, value, column = "data") {
        return Database.raw(`LOWER(JSON_EXTRACT(${column}, "$.${index}"))  LIKE ?`, [`%${value}%`]);
    }

    queryWhereRaw(model, raws = []) {
        let query = model.query();
        for (let index = 0; index < raws.length; index++) {
            query.orWhereRaw(raws[index]);
        }

        return query;
    }
}

module.exports = DefaultRepository
