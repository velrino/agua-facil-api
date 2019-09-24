'use strict'

const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');
const MapsService = use('App/Infra/Services/Maps');
const MailService = use('App/Infra/Services/Mail');

class CreateOrderCommand extends DefaultCommand {

    rules = {
        company_place_id: 'required|string',
        client_name: 'required',
        client_cep: 'required',
        client_address: 'required',
        client_email: 'required',
        client_state: 'required',
        client_number: 'required',
        client_phone: 'required',
        quantity: 'required',
        meters: 'required',
        scheduling: 'required',
        date: 'required',
        obs: 'string',
    }

    async execute({ request, response }) {
        try {
            const inputs = request.all();
            const validation = await this.validator(inputs, this.rules);

            if (validation != null)
                return response.status(400).json(validation);

            const data = await new OrderRepository().create(inputs);

            let mailData = {
                ...data.toJSON()
            }
            new MailService().sendMail(
                inputs['client_email'],
                '[Água Fácil] Seu pedido está a caminho',
                mailData);

            return response.status(200).json(mailData);
        } catch (e) {
            return response.status(422).json({ message: 'UNPROCESSED' });
        }
    }
}
module.exports = CreateOrderCommand