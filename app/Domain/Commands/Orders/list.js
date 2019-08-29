'use strict'

const DefaultCommand = use('./../default');
const OrderRepository = use('App/Infra/Repositories/Order');

class ListOrderCommand extends DefaultCommand {

  async execute({ request, auth, response }) {
    try {
      const user = await auth.getUser();
      const data = await new OrderRepository().list(user.company_id);

      if (data == null)
        return response.status(404).json({ message: 'NOT_FOUND' });

      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = ListOrderCommand
