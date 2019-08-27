'use strict'

const DefaultRepository = use('./Default');
const Feedback = use('App/Models/Feedback');

class FeedbackRepository extends DefaultRepository {
  async store(params) {
    return await Feedback.create(params);
  }
}

module.exports = FeedbackRepository
