'use strict'

const DefaultRepository = use('./Default');
const Company = use('App/Models/Company');

class CompanyRepository extends DefaultRepository {
    async get() {
        const value = "lor"
        const index = "POMPUP";
        const query = this.rawJsonExtract(index, value);

        return await this.queryWhereRaw(Company, query).paginate(1, 10);
    }
}

module.exports = CompanyRepository
