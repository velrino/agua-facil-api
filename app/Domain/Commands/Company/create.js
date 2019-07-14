'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');

class CreateCompanyCommand extends DefaultCommand {

  rules = {
    document: 'required|string|unique:companies,document',
    'data': 'required',
    'data.name_fantasy': 'required|string',
    'data.phone': 'required|string',
    'data.person': 'required|string',
    'data.name_social': 'required|string',
  }

  async execute({ request, response }) {
    try {
      const inputs = request.all();
      const validation = await this.validator(inputs, this.rules);

      if (validation != null)
        return response.status(400).json(validation);

      const data = await new CompanyRepository().store(inputs);
      return data;

    } catch (e) {
      console.log(e);

    }
  }
}
module.exports = CreateCompanyCommand