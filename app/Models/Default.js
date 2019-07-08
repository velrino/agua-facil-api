'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuid = require('uuid');
const lodash = require('lodash');

class Default extends Model {
    static boot() {
        const self = this;
        super.boot();
        /* Before create new record. */
        this.addHook('beforeCreate', async (modelInstance) => {
            modelInstance.id = uuid.v4();
        });
        /* Before creating or updating a new record. */
        this.addHook('beforeSave', async (modelInstance) => {
            modelInstance.data = this.handleColumnDataOnSave(modelInstance);
        })
        /* After a single record is fetched from the database. */
        this.addHook('afterFind', async (modelInstance) => {
            modelInstance.data = JSON.parse(modelInstance.data);
        })
        this.addHook('afterFetch', async (modelInstance) => {
            console.log(modelInstance);
            modelInstance.for
            //modelInstance.data = JSON.parse(modelInstance.data);
        })        
    }

    static handleColumnDataOnSave(modelInstance) {
        const originalData = modelInstance.$originalAttributes.data;
        const newData = (!lodash.isEmpty(originalData)) ? Object.assign(JSON.parse(originalData), modelInstance.data) : modelInstance.data;

        return JSON.stringify(newData);
    }
}

module.exports = Default
