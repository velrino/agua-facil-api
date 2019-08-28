'use strict'

const Database = use('Database')
const Company = use('App/Models/Company')
const CompanyPlace = use('App/Models/CompanyPlace')
const Status = use('App/Models/Status')
const OrderHistoric = use('App/Models/OrderHistoric')
const { orderStatus } = use('./../../config/enums');
const User = use('App/Models/User')
const Env = use('Env')

class DatabaseSeeder {
  async run() {
    const foreignKeyOff = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 0;': 'PRAGMA foreign_keys = OFF;';
    const foreignKeyOn = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 1;': 'PRAGMA foreign_keys = ON;';

    await Database.raw(foreignKeyOff);
    await OrderHistoric.truncate();
    await Status.truncate();
    await Company.truncate();
    await CompanyPlace.truncate();

    const orderStatusHistoric = Object.keys(orderStatus).map(index => orderStatus[index]);
    await Status.createMany(orderStatusHistoric);

    await Company.createMany([
      {
        id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        email: 'velrino@gmail.com',
        document: '123456789',
        status_id: 1,
        type: 99,
        name_fantasy: 'Agua Facil',
        name_social: 'Agua Facil',
        phone: '123456789',
        person: 'Vinicius',
      },
      {
        id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        email: 'lorem@mail.com',
        document: '987654321',
        status_id: 1,
        name_fantasy: 'Lorem',
        name_social: 'Lorem Campus',
        phone: '987654321',
        person: 'Flavio Ipsum',
      }
    ]);

    await User.createMany([
      {
        id: '3fbc4824-1f94-41e1-9c55-b20c407c394d',
        email: 'e@mail.com',
        password: '1234',
        status_id: 1,
        company_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
      },
      {
        id: '1fffe522-e46f-4366-9cb9-bb4807b58b58',
        email: 'u@mail.com',
        password: '1234',
        status_id: 1,
        company_id: '',
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
        address: 'Avenida Paulista 1374, 01310-100, São Paulo',
        data: {
          payment: [1, 2, 3],
          period: [4, 5, 6],
          meters: [3, 4],
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
        address: 'Rua Santa Rita da Estrela 431, 08420-318, São Paulo',
        data: {
          payment: [1, 2, 3],
          period: [4, 5, 6],
          meters: [3, 5],
        }
      },
      {
        id: '62e00834-a0ac-42fd-88f7-9a781b95ec0c',
        company_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        status_id: 1,
        scheduling: true,
        trucks: 5,
        price: 10.4,
        distance: 4,
        latitude: '-23.570921',
        longitude: '-46.649910',
        address: 'Rua Coronel Oscar Porto, 70 - Paraíso, São Paulo - SP, 04003-000',
        data: {
          payment: [1, 2, 3],
          period: [4, 5, 6],
          meters: [3, 5],
        }
      },
      {
        id: 'aed62762-8e08-49ab-b60f-9c10d9ec9cc9',
        company_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        status_id: 1,
        scheduling: true,
        trucks: 5,
        price: 10.4,
        distance: 4,
        latitude: '-23.632670',
        longitude: '-46.703200',
        address: 'Rua Alexandre Dumas, 2051 - Chácara Santo Antônio, São Paulo',
        data: {
          payment: [1, 2, 3],
          period: [4, 5, 6],
          meters: [3, 5],
        }
      },
    ]);

    await Database.raw(foreignKeyOn)
  }
}

module.exports = DatabaseSeeder
