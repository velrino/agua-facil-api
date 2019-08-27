'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');

class UpdateCompanyCommand extends DefaultCommand {

  rules = {
    document: 'string|unique:companies,document',
    name_fantasy: 'string',
    phone: 'string',
    person: 'string',
    name_social: 'string',
    status_id: 'number',
    type: 'number',
  }

  async execute({ request, response }) {
    try {
      const inputs = request.all();
      const validation = await this.validator(inputs, this.rules);

      if (validation != null)
        return response.status(400).json(validation);

      const data = await new CompanyRepository().update(request.params.id, inputs);
      if (!data)
        return response.status(400).json({ message: 'NOT_UPDATED' });

      return response.status(200).json({ message: 'UPDATED' });
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = UpdateCompanyCommand
