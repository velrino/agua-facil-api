'use strict'

const DefaultRepository = use('./Default');
const User = use('App/Models/User');

class UserRepository extends DefaultRepository {
  async store(params) {
    return await User.create(params);
  }

  async getByEmail(email) {
    return await User.query().where('email', email).first();
  }
}

module.exports = UserRepository
