'use strict'

const DefaultRepository = use('./Default');
const Company = use('App/Models/Company');

class CompanyRepository extends DefaultRepository {
    async get() {
        return await Company.query().paginate(1, 10);
    }

    async getWhereRawJsonExtract(params = {}) {
        let query = this.getPayments(params['payments']);

        return await this.queryWhereRaw(Company.query(), query).paginate(1, 10);
    }

    getPayments(param = '') {
        //{"price": "50", "period": [1, 3], "trucks": 4, "payment": [1, 2, 3], "distance": 2}
        const payments = param.split(",");
        let query = [];
        for (let index = 0; index < payments.length; index++) {
            query.push(this.rawJsonExtract('payment', payments[index]));
        }
        return query;
    }
}

module.exports = CompanyRepository
