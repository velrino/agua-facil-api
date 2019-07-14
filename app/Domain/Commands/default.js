'use strict'

const { validate } = use('Validator')
const Response = use('Adonis/Src/Response')

class DefaultCommand {
    getDatasQueries(queries, column = "data->", replace = "") {
        return Object.assign({},
            ...Object.keys(queries)
                .filter((value) => value.includes(column))
                .map((value) => {
                    return { [value.replace(column, replace)]: queries[value] }
                }));
    }

    async validator(request, rules) {
        const validation = await validate(request, rules);
        return (validation.fails()) ? validation.messages() : null;
    }
    
}
module.exports = DefaultCommand