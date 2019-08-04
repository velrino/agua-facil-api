'use strict'

const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');
const { orderStatus } = use('./../../../../config/enums');

class GetOrderCommand extends DefaultCommand {

    nextStatus(status_id) {
        const notNext = [status_id, orderStatus.expired.id, orderStatus.canceled.id];
        return Object.keys(orderStatus)
            .filter(index => !notNext.includes(orderStatus[index].id) && (status_id + 1) == orderStatus[index].id)
            .map(index => orderStatus[index])[0] || {};
    }

    async execute({ request, response }) {
        // try {
        const data = await new OrderRepository().get(request.params.id);

        if (data == null)
            return response.status(404).json({ message: 'NOT_FOUND' });

        return { ...data.toJSON(), nextStatus: this.nextStatus(data.status_id) }
        //} catch (e) {
        //  console.log(e);
        //}
    }
}
module.exports = GetOrderCommand