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
        obs: 'required',
    }

    async execute({ request, response }) {
        try {

            const inputs = request.all();
            const validation = await this.validator(inputs, this.rules);

            if (validation != null)
                return response.status(400).json(validation);

            const data = await new OrderRepository().create(inputs);
            //const dataJson = data..toJSON()
            let mailData = {
                ...data.toJSON(),
                link: 'https://aguafacil.github.io/order/'.concat(data.id)
            }
            await new MailService().sendMail(
                inputs['client_email'], 
                'Seu pedido está a caminho',
                mailData);
            
            return mailData;
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = CreateOrderCommand