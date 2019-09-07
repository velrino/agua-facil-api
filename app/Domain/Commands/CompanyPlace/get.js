'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');

class GetCompanyPlaceCommand extends DefaultCommand {

    async execute({ request, response }) {
        try {
            let data = await new CompanyPlaceRepository().first(request.params.id);

            if (!data)
                return response.status(404).json({ message: 'NOT_FOUND' });
            return response.status(200).json(data);
        } catch (error) {
            return response.status(422).json({ message: 'UNPROCESSED' });
        }
    }
}
module.exports = GetCompanyPlaceCommand