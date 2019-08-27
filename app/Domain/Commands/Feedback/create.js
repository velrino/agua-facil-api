'use strict'

const DefaultCommand = use('./../default');
const FeedbackRepository = use('App/Infra/Repositories/Feedback');

class CreateFeedbackCommand extends DefaultCommand {

  rules = {
    order_id: 'required|string',
    rating: 'required|number',
    text: 'required|string',
  }

  async execute({ request, response }) {
    try {
      const inputs = request.all();
      const validation = await this.validator(inputs, this.rules);

      if (validation != null)
        return response.status(400).json(validation);

      const data = await new FeedbackRepository().store(inputs);
      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = CreateFeedbackCommand
