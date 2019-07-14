'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('status', (table) => {
      table.increments('id').primary();
      table.string('text', 30).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('status')
  }
}

module.exports = StatusSchema
