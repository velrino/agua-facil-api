'use strict'

class DefaultCommand {
    getDatasQueries(queries, column = "data->", replace = "") {
        return Object.assign({},
            ...Object.keys(queries)
                .filter((value) => value.includes(column))
                .map((value) => {
                    return { [value.replace(column, replace)]: queries[value] }
                }));
    }
}
module.exports = DefaultCommand