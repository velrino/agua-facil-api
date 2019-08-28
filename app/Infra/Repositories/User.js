'use strict'

const DefaultRepository = use('./Default');
const User = use('App/Models/User');

class UserRepository extends DefaultRepository {
  async store(params) {
    return await User.create(params);
  }
}

module.exports = UserRepository
