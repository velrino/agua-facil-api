'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesPlacesSchema extends Schema {
  up() {
    this.create('companies_places', (table) => {
      table.uuid('company_place_id').primary();
      table.uuid('company_id')
        .references('company_id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('status', 2).defaultTo(1);
      table.json('data');
      table.timestamps()
    })
  }

  down() {
    this.drop('companies_places')
  }
}

module.exports = CompaniesPlacesSchema
