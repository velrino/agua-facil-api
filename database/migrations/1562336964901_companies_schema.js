'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesSchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.uuid('id').primary();
      table.string('email', 254).notNullable().unique()
      table.string('document', 20).unique().notNullable();
      table.string('name_fantasy', 100).notNullable();
      table.string('phone', 20).notNullable();
      table.string('person', 100).notNullable();
      table.string('name_social', 100).notNullable();
      table.integer('status_id', 2).unsigned().notNullable().defaultTo(1);
      table.foreign('status_id')
        .references('id')
        .inTable('status')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.json('data').nullable();
      table.integer('type').notNullable().defaultTo(1);
      table.timestamps();
    })
  }

  down() {
    this.drop('companies')
  }
}

module.exports = CompaniesSchema
