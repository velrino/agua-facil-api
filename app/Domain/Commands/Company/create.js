'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');

class CreateCompanyCommand extends DefaultCommand {

  rules = {
    document: 'required|string|unique:companies,document',
    name_fantasy: 'required|string',
    phone: 'required|string',
    person: 'required|string',
    name_social: 'required|string',
  }

  async execute({ request, response }) {
    try {
      const inputs = request.all();
      const validation = await this.validator(inputs, this.rules);

      if (validation != null)
        return response.status(400).json(validation);

      const data = await new CompanyRepository().store(inputs);
      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = CreateCompanyCommand
