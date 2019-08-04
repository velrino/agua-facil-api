'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');

class SearchCompanyPlaceCommand extends DefaultCommand {

  async execute({ request }) {
    try {
      const queries = request.qs;
      let data = new CompanyPlaceRepository().getWhereRawJsonExtract(queries);

      return data
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = SearchCompanyPlaceCommand