'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');
const Company = use('App/Models/Company');
class GetCompanyCommand extends DefaultCommand {

  async execute({ request }) {
    const queries = request.qs;

    let data = new CompanyRepository().getWhereRawJsonExtract(queries); 
    return data
  }
}
module.exports = GetCompanyCommand