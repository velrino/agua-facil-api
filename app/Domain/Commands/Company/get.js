'use strict'

const DefaultCommand = use('./../default');
const Company = use('App/Models/Company');
const Database = use('Database')
const CompanyRepository = use('App/Infra/Repositories/Company');

class GetCompanyCommand extends DefaultCommand {

  async execute({ request }) {
    const queries = request.qs;
    let queriesDatas = this.getDatasQueries(queries);
    let data = new CompanyRepository().get(); 
    //Database.raw("jsoncolumn->'$.key' AS foo")
    // const name = request.input('name')
    // const email = request.input('email')
    // const title = request.input('title')
    // const tel = request.input('tel')

    //const company = await Company.find("45791173-ddfb-4258-8eb1-78ae6899b9fd");
    //const company = new Company;
    //company.document = "212112"
    //company.data = { POMPUP: "lorem", ABC: "ipsum" };
    //company.company_id = "uuid.v4()";
    //await company.save()
    return data
  }
}
module.exports = GetCompanyCommand