'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');
const MapsService = use('App/Infra/Services/Maps');

class CreateCompanyPlaceCommand extends DefaultCommand {

  rules = {
    company_id: 'required|string',
    trucks: 'required|integer',
    price: 'required',
    distance: 'required',
    address: 'required|string',
    data: 'required',
    'data.meters': 'required|array',
    'data.period': 'required|array',
    'data.payment': 'required|array',
  }

  handleInputsMaps(inputs, maps) {
    const { lat, lng } = maps.geometry.location;

    delete inputs['address'];
    return { ...inputs, latitude: lat, longitude: lng }
  }

  async execute({ request, response }) {
    const inputs = request.all();
    const validation = await this.validator(inputs, this.rules);

    if (validation != null)
      return response.status(400).json(validation);

    try {
      const maps = await new MapsService().getLocationByAddres(inputs['address']);

      if (!maps)
        return response.status(400).json({ message: 'ADDRESS_NOT_FOUND' });

      const newInputs = this.handleInputsMaps(inputs, maps);

      const data = await new CompanyPlaceRepository().create(newInputs);

      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = CreateCompanyPlaceCommand
