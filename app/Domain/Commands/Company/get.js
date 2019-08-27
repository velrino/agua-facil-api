'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');

class GetCompanyCommand extends DefaultCommand {

  async execute({ request, response }) {
    try {
      const queries = request.qs;

      let data = await new CompanyRepository().getWhereRawJsonExtract(queries);

      return response.status(200).json(data);
    } catch (error) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = GetCompanyCommand
