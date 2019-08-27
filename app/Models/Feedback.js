'use strict'

const Default = use('./Default')

class Feedback extends Default {
    static get table() {
        return 'feedbacks_orders'
    }
}

module.exports = Feedback
