'use strict'

const Database = use('Database')
const Company = use('App/Models/Company')
const CompanyPlace = use('App/Models/CompanyPlace')
const Status = use('App/Models/Status')
const OrderHistoric = use('App/Models/OrderHistoric')
const { orderStatus } = use('./../../config/enums');

class DatabaseSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;');
    await OrderHistoric.truncate();
    await Status.truncate();
    await Company.truncate();
    await CompanyPlace.truncate();

    const orderStatusHistoric = Object.keys(orderStatus).map(index => orderStatus[index]);
    await Status.createMany(orderStatusHistoric);

    await Company.createMany([{
      id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
      document: '123456789',
      status_id: 1,
      name_fantasy: 'Lorem',
      name_social: 'Lorem Ipsum',
      phone: '123456789',
      person: 'Shazam Ipsum',
    }
    ]);

    await CompanyPlace.createMany([
      {
        id: '1fffe522-e46f-4366-9cb9-bb4807b58b59',
        company_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        status_id: 1,
        scheduling: true,
        trucks: 3,
        price: 10.4,
        distance: 4,
        latitude: '-23.562700',
        longitude: '-46.654610',
        data: {
          payment: [1, 2, 3],
          period: [4, 5, 6],
          meters: [3, 4]
        }
      },
      {
        id: 'dae2d1a4-b00b-4281-980e-875f31e188e1',
        company_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        status_id: 1,
        scheduling: true,
        trucks: 5,
        price: 10.4,
        distance: 4,
        latitude: '-23.5437565',
        longitude: '-46.429703599999996',
        data: {
          payment: [1, 2, 3],
          period: [4, 5, 6],
          meters: [3, 5]
        }
      },
    ]);

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = DatabaseSeeder
