'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');
const Company = use('App/Models/Company');
class GetCompanyCommand extends DefaultCommand {

  async execute({ request }) {
    const queries = request.qs;
    let queriesDatas = this.getDatasQueries(queries);
    //Database.raw("jsoncolumn->'$.key' AS foo")
    // const name = request.input('name')
    // const email = request.input('email')
    // const title = request.input('title')
    // const tel = request.input('tel')

    //const company = await Company.find("45791173-ddfb-4258-8eb1-78ae6899b9fd");
    // const company = new Company;
    // company.document = "12121212111212121"
    // company.data = { POMPUP: "lorem", ABC: "ipsum", testCarai: [1,2,3] };
    // await company.save();
    let data = new CompanyRepository().get(); 
    return data
  }
}
module.exports = GetCompanyCommand