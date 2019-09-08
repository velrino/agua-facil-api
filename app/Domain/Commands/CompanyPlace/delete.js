'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');

class DeleteCompanyPlaceCommand extends DefaultCommand {

    async execute({ request, response }) {
        try {
            const data = await new CompanyPlaceRepository().update(request.params.id, { status_id: 99 });
            if (!data)
                return response.status(400).json({ message: 'NOT_DELETED' });

            return response.status(200).json({ message: 'DELETED' });
        } catch (e) {
            return response.status(422).json({ message: 'UNPROCESSED' });
        }
    }
}
module.exports = DeleteCompanyPlaceCommand