'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');

class SearchCompanyPlaceCommand extends DefaultCommand {

  async execute({ request, response }) {
    try {
      const queries = request.qs;
      let data = await new CompanyPlaceRepository().getWhereRawJsonExtract(queries);

      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = SearchCompanyPlaceCommand
