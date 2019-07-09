'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricSchema extends Schema {
  up () {
    this.create('historics', (table) => {
      table.increments('id').primary();
      table.string('text', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('historics')
  }
}

module.exports = HistoricSchema
