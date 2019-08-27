'use strict'

const DefaultRepository = use('./Default');
const Company = use('App/Models/Company');

class CompanyRepository extends DefaultRepository {
  async store(params) {
    return await Company.create(params);
  }

  async update(id, params) {
    return await Company.query().where('id', id).update(params);
  }

  async get() {
    return await Company.query().paginate(1, 10);
  }

  async getWhereRawJsonExtract(params = {}) {
    let query = this.whereByName(params['name']);

    return await this.queryWhereRaw(Company.query(), query).paginate(1, 10);
  }

  whereByName(param = null, query = []) {
    if (param != null) {
      query.push(this.rawJsonExtract('name_social', param));
      query.push(this.rawJsonExtract('name_fantasy', param));
    }

    return query;
  }

  getPayments(param = '') {
    //{"price": "50", "period": [1, 3], "trucks": 4, "payment": [1, 2, 3], "distance": 2}
    const payments = param.split(",");

    for (let index = 0; index < payments.length; index++) {
      query.push(this.rawJsonExtract('name_fantasy', payments[index]));
    }
    return query;
  }
}

module.exports = CompanyRepository
