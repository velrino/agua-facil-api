'use strict'

const { orderStatus } = use('App/../config/enums');
const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');

class IncrementOrderCommand extends DefaultCommand {

    checkStatus(status_id) {
        return Object.keys(orderStatus)
            .filter(index => orderStatus[index].id == status_id)[0] || null;
    }

    async execute({ request, response }) {
        const checkStatus = this.checkStatus(request.params.status);
        if (!checkStatus)
            return response.status(400).json({ message: 'INVALID_STATUS' });
        const status = orderStatus[checkStatus];

        try {
            const repository = new OrderRepository();

            const check = await repository.checkHistoric(request.params.id, status.id);
            if (check != null)
                return response.status(400).json({ message: 'EXIST_STATUS_FOR_THIS_ORDER' });

            const data = await repository.getLastHistoric(request.params.id);
            if (data == null)
                return response.status(404).json({ message: 'NOT_FOUND' });

            await repository.createHistoric(request.params.id, status.id);
            await repository.updateOrderStatus(request.params.id, status.id);
            return response.status(204);
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = IncrementOrderCommand