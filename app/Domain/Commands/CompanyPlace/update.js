'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');
const MapsService = use('App/Infra/Services/Maps');

class UpdateCompanyPlaceCommand extends DefaultCommand {

  rules = {
    company_id: 'string',
    trucks: 'integer',
    price: 'string',
    distance: 'string',
    address: 'string',
    'data.meters': 'array',
    'data.period': 'array',
    'data.payment': 'array',
    status_id: 'number',
  }

  handleInputsMaps(inputs, maps) {
    const { lat, lng } = maps.geometry.location;

    return { ...inputs, latitude: lat, longitude: lng }
  }

  async execute({ request, response }) {
    let inputs = request.all();
    const validation = await this.validator(inputs, this.rules);

    if (validation != null)
      return response.status(400).json(validation);

    try {
      if(inputs['address']) {
        const maps = await new MapsService().getLocationByAddres(inputs['address']);

        if (!maps)
          return response.status(400).json({ message: 'ADDRESS_NOT_FOUND' });

          inputs = this.handleInputsMaps(inputs, maps);
      }

      const data = await new CompanyPlaceRepository().update(request.params.id, inputs);
      if (!data)
        return response.status(400).json({ message: 'NOT_UPDATED' });

      return response.status(200).json({ message: 'UPDATED' });
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = UpdateCompanyPlaceCommand
