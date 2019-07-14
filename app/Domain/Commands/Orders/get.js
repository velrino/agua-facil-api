'use strict'

const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');

class GetOrderCommand extends DefaultCommand {

    async execute({ request, response }) {
        try {
            const data = await new OrderRepository().get(request.params.id);

            if (data == null)
                return response.status(404).json({ message: 'NOT_FOUND' });
            return data;
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = GetOrderCommand