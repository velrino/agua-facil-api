'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedbacksSchema extends Schema {
  up() {
    this.create('feedbacks_orders', (table) => {
      table.uuid('id').primary();
      table.uuid('order_id')
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('status', 2).defaultTo(1);
      table.string('type', 10).defaultTo('order');
      table.integer('rating', 1).defaultTo(1).notNullable();
      table.json('data');
      table.timestamps()
    })
  }

  down() {
    this.drop('feedbacks')
  }
}

module.exports = FeedbacksSchema
