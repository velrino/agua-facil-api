'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesSchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.uuid('company_id').primary();
      table.string('document', 20).unique();
      table.integer('status', 2).defaultTo(1);
      table.json('data');
      table.timestamps();
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompaniesSchema
