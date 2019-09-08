'use strict'

const DefaultCommand = use('./../default');
const CompanyRepository = use('App/Infra/Repositories/Company');
const UserRepository = use('App/Infra/Repositories/User');
const MailService = use('App/Infra/Services/Mail');

class UpdateCompanyCommand extends DefaultCommand {

    rules = {
        document: 'string',
        name_fantasy: 'string',
        phone: 'string',
        person: 'string',
        name_social: 'string',
        status_id: 'number',
        type: 'number',
        user: 'boolean'
    }

    async createUser(company) {
        const { email, id } = company;
        const password = id.substring(0, 6);

        await new UserRepository().store({
            email,
            password,
            company_id: id
        });

        new MailService().sendMail(
            email,
            '[Água Fácil] Sua conta foi criada', {
                email,
                password
            },
            'emails.welcome-admin'
        );
    }

    async execute({ request, response }) {
        try {
            let inputs = request.all();
            delete inputs['status'];
            const validation = await this.validator(inputs, this.rules);

            if (validation != null)
                return response.status(400).json(validation);

            if (inputs['user']) {
                const getCompany = await new CompanyRepository().first(request.params.id);
                if (!getCompany.user) {
                    inputs['user'] = true;
                    await this.createUser(getCompany);
                    inputs.status_id = 98;
                }
            }

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