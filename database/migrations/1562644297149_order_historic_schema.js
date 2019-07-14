'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderHistoricSchema extends Schema {
  up() {
    this.create('order_historics', (table) => {
      table.uuid('id').primary();
      table.uuid('order_id')
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('status_id', 2).unsigned().notNullable().defaultTo(1);
      table.foreign('status_id')
        .references('id')
        .inTable('status')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down() {
    this.drop('order_historics')
  }
}

module.exports = OrderHistoricSchema
