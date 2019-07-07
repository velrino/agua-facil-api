'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedbacksSchema extends Schema {
  up () {
    this.create('feedbacks', (table) => {
      table.uuid('feedback_id').primary();
      table.uuid('origin_id');
      table.integer('status', 2).defaultTo(1);
      table.string('type', 10).defaultTo('order');
      table.json('data');
      table.timestamps()
    })
  }

  down () {
    this.drop('feedbacks')
  }
}

module.exports = FeedbacksSchema
