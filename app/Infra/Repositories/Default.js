'use strict'

const Database = use('Database')
const Model = use('Model')

class DefaultRepository extends Model {
    rawJsonContains(index, value, column = "data") {
        return Database.raw(`JSON_CONTAINS(${column}, '${value}', '$.${index}') IN (?)`, [value]);
    }

    rawJsonExtract(index, value, type = 'LIKE', column = "data") {
        const newValue = (type == 'LIKE') ? `%${value}%` : value;
        return Database.raw(`LOWER(JSON_EXTRACT(${column}, "$.${index}")) ${type} ?`, [newValue]);
    }

    queryWhereRaw(query, raws = [], method = 'orWhereRaw') {
        for (let index = 0; index < raws.length; index++) {
            query[method](raws[index]);
        }

        return query;
    }
}

module.exports = DefaultRepository
