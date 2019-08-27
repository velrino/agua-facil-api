'use strict'

const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');

class GetOrderCommand extends DefaultCommand {

  async execute({ request, response }) {
    try {
      const params = this.genericQueryParams(request.all());
      const data = await new OrderRepository().getCompany(request.params.id, params);

      if (data == null)
        return response.status(404).json({ message: 'NOT_FOUND' });
      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = GetOrderCommand
