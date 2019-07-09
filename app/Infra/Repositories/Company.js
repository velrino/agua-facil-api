'use strict'

const DefaultRepository = use('./Default');
const Company = use('App/Models/Company');

class CompanyRepository extends DefaultRepository {
    async get() {
        return await Company.query().paginate(1, 10);
    }

    async getWhereRawJsonExtract(params = {}) {
        const query = this.getPayments(params['payments']);

        return await this.queryWhereRaw(Company.query(), query, 'whereRaw').paginate(1, 10);
    }

    getPayments(param = '') {
        const payments = param.split(",");
        let query = [];
        for (let index = 0; index < payments.length; index++) {
            query.push(this.rawJsonExtract('testCarai', payments[index]));
        }
        return query;
    }
}

module.exports = CompanyRepository
