'use strict'

const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');

class CreateOrderCommand extends DefaultCommand {

    rules = {
        'company_place_id': 'required|string',
        'data': 'required',
        'data.client': 'required',
        'data.client.name': 'required',
        'data.client.address': 'required',
        'data.client.phone': 'required',
        'data.quantity': 'required',
        'data.meters': 'required',
        'data.scheduling': 'required',
        'data.date': 'required',
        'data.obs': 'required',
    }

    async execute({ request, response }) {
        const inputs = request.all();
        const validation = await this.validator(inputs, this.rules);

        if (validation != null)
            return response.status(400).json(validation);
            
        try {
            const data = await new OrderRepository().create(inputs);

            return data;
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = CreateOrderCommand