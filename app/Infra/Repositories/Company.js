'use strict'

const DefaultRepository = use('./Default');
const Company = use('App/Models/Company');

class CompanyRepository extends DefaultRepository {
    async get() {
        return await Company.query().paginate(1, 10);
    }

    async getWhereRawJsonExtract() {
        const query = [
            this.rawJsonExtract('POMPUP', 'lorem'),
            this.rawJsonExtract('testCarai', 4)
        ];

        return await this.queryWhereRaw(Company.query(), query, 'whereRaw').paginate(1, 10);
    }
}

module.exports = CompanyRepository
