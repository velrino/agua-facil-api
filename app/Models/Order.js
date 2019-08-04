'use strict'

const Default = use('./Default')

class Order extends Default {
    historic() {
        return this.hasMany('App/Models/OrderHistoric').orderBy('status_id', 'ASC');
    }

    companyPlace() {
        return this.hasOne('App/Models/CompanyPlace', 'company_place_id', 'id')
    }
}

module.exports = Order
