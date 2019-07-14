'use strict'

const Default = use('./Default')

class Order extends Default {
    historic() {
        return this.hasMany('App/Models/OrderHistoric').orderBy('status_id', 'ASC');
    }
}

module.exports = Order
