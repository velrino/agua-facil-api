'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');
const UserRepository = use('App/Infra/Repositories/User');
const MailService = use('App/Infra/Services/Mail');

class DeleteCompanyCommand extends DefaultCommand {

    async sendemail(company, status, emailSubject) {
        const { email } = company;

        new MailService().sendMail(
            email,
            emailSubject,
            null,
            'emails.'.concat(status).concat('-admin')
        );
    }

    handleStatus(status) {
        const options = {
            'active': {
                message: 'ACTIVED',
                status_id: 1,
                emailSubject: '[Água Fácil] Sua conta foi ativada'
            },
            'delete': {
                message: 'DELETED',
                status_id: 99,
                emailSubject: '[Água Fácil] Sua conta foi desativada'
            }
        }

        return options[status.toLowerCase()];
    }

    async execute({ request, response }) {
        try {
            const dataStatus = this.handleStatus(request.params.status);

            if (!dataStatus)
                return response.status(400).json({ message: 'INVALID_STATUS' });

            const { emailSubject, message, status_id } = dataStatus;
            const getCompany = await new CompanyRepository().first(request.params.id);
            if (!getCompany)
                return response.status(404).json({ message: 'NOT_FOUND' });

            await new CompanyRepository().update(request.params.id, { status_id });
            await new CompanyPlaceRepository().updateByCompany(request.params.id, { status_id });
            await new UserRepository().updateByCompany(request.params.id, { status_id });

            this.sendemail(getCompany, request.params.status, emailSubject);

            return response.status(200).json({ message });
        } catch (e) {
            return response.status(422).json({ message: 'UNPROCESSED' });
        }
    }
}
module.exports = DeleteCompanyCommand