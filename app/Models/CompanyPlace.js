'use strict'

const Default = use('./Default')

class CompanyPlace extends Default {
    static get table() {
        return 'companies_places'
    }

    company() {
        return this.belongsTo('App/Models/Company');
    }
}

module.exports = CompanyPlace
