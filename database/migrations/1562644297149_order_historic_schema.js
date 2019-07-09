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
      table.integer('historic_id').unsigned().notNullable();
      table.foreign('historic_id')
        .references('id')
        .inTable('historics')
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
