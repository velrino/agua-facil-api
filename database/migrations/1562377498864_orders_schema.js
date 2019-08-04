'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.uuid('id').primary();
      table.uuid('company_place_id')
        .references('id')
        .inTable('companies_places')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('status_id', 2).unsigned().notNullable().defaultTo(1);
      table.foreign('status_id')
        .references('id')
        .inTable('status')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.json('data').nullable();
      table.string('client_name', 60).notNullable()
      table.string('client_number', 20).nullable()
      table.string('client_email', 120).nullable()
      table.string('client_address', 120).nullable()
      table.string('client_state', 120).nullable()
      table.string('client_phone', 20).nullable()
      table.string('client_cep', 10).nullable()
      table.integer('quantity')
      table.string('meters', 10).nullable()
      table.string('date', 10).nullable()
      table.decimal('total', 10, 2).nullable()
      table.text('obs').nullable()
      table.boolean('scheduling').defaultTo(false);
      table.timestamps()
    })
  }
  //insert into `orders` (`client_address`, `client_cep`, `client_email`, `client_name`, `client_number`, `client_phone`, `client_state`, `company_place_id`, `created_at`, `data`, `date`, `id`, `meters`, `obs`, `quantity`, `scheduling`, `total`, `updated_at`) values ('120910', '08431110', '091209901', 'Denis', '90920190', '1290021091', NULL, '1fffe522-e46f-4366-9cb9-bb4807b58b59', '2019-08-03 22:45:25', DEFAULT, `year` = 2019, `month` = 8, `day` = 3, '4fb5c44a-493c-44ed-bcae-dc69f314eebc', 12, '09211092', 211, false, 50640, '2019-08-03 22:45:25')"

  down() {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
