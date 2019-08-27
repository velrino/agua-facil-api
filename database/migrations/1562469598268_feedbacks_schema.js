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
      table.integer('status_id', 2).unsigned().notNullable().defaultTo(1);
      table.foreign('status_id')
        .references('id')
        .inTable('status')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('type', 10).defaultTo('order');
      table.integer('rating', 1).defaultTo(1).notNullable();
      table.text('text').nullable();
      table.json('data').nullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('feedbacks_orders')
  }
}

module.exports = FeedbacksSchema
