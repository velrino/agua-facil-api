'use strict'

const ENUMS = use('App/../config/enums');
const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');

class IncrementOrderCommand extends DefaultCommand {

    async execute({ request, response }) {
        const status = ENUMS.orderStatus[request.params.status];
        if (status == null)
            return response.status(400).json({ message: 'INVALID_STATUS' });
            
        try {
            const repository = new OrderRepository();

            const check = await repository.checkHistoric(request.params.id, status.id);
            if (check != null)
                return response.status(400).json({ message: 'EXIST_STATUS_FOR_THIS_ORDER' });

            const data = await repository.getLastHistoric(request.params.id);
            if (data == null)
                return response.status(404).json({ message: 'NOT_FOUND' });

            return await repository.createHistoric(request.params.id, status.id);
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = IncrementOrderCommand