'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.uuid('id').primary();
      table.uuid('origin_id');
      table.integer('status_id', 2).unsigned().notNullable().defaultTo(1);
      table.foreign('status_id')
        .references('id')
        .inTable('status')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('type', 10).defaultTo('order');
      table.boolean('visualized').defaultTo(false);
      table.boolean('send_email').defaultTo(false);
      table.boolean('send_whatsapp').defaultTo(false);
      table.json('data');
      table.timestamps()
    })
  }

  down() {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
