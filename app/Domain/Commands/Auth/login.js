'use strict'

const DefaultCommand = use('./../default');
const UserRepository = use('App/Infra/Repositories/User');

class AuthLoginCommand extends DefaultCommand {

    rules = {
        email: 'required|string',
        password: 'required|string',
    }

    async execute({ request, auth, response }) {
        try {

            const inputs = request.all();
            const validation = await this.validator(inputs, this.rules);

            if (validation != null)
                return response.status(400).json(validation);

            const checkAuth = await auth.attempt(inputs.email, inputs.password);

            if (!checkAuth)
                return response.status(400).json({ message: 'INVALID_EMAIL_OR_PASSWORD' });

            const user = await new UserRepository().getByEmail(inputs.email);
            const token = await auth.generate(user)

            Object.assign(user, token)
            return response.status(200).json(user);
        } catch (e) {
            return response.status(422).json({ message: 'UNPROCESSED' });
        }
    }
}

module.exports = AuthLoginCommand