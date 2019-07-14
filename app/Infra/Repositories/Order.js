'use strict'

const DefaultRepository = use('./Default');
const Order = use('App/Models/Order');
const OrderHistoric = use('App/Models/OrderHistoric');

class OrderRepository extends DefaultRepository {
    async create(params) {
        const order = await Order.create(params);
        await OrderHistoric.create({ order_id: order.id, data: {} });
        return order;
    }

    async get(id) {
        return await Order.query().where('id', id).with('historic').first();
    }

    async getLastHistoric(id) {
        return await OrderHistoric.query().where('order_id', id).last();
    }

    async checkHistoric(id, status) {
        return await OrderHistoric.query().where('order_id', id).where('status_id', status).first();
    }

    async createHistoric(order_id, status_id) {
        return await OrderHistoric.create({ order_id, status_id, data: {} });
    }
}

module.exports = OrderRepository
