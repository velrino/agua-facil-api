'use strict'

const DefaultRepository = use('./Default');
const Order = use('App/Models/Order');
const CompanyPlace = use('App/Models/CompanyPlace');
const OrderHistoric = use('App/Models/OrderHistoric');

class OrderRepository extends DefaultRepository {
    async create(params) {
        const order = await Order.create(params);
        await OrderHistoric.create({ order_id: order.id, data: {} });
        return order;
    }

    async get(id) {
        return await Order.query().where('id', id)
            .with('status')
            .with('companyPlace')
            .with('historic', (query) => {
                query.with('status');
            })
            .first();
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

    async getCompany(id, params) {
        const companyPlaces = await CompanyPlace.query().select('id').where('company_id', id).pluck('id');

        return await Order.query()
            .whereIn('company_place_id', companyPlaces)
            .with('status')
            .with('companyPlace')
            .paginate(params.page, params.limit);
    }

    async updateOrderStatus(id, status_id) {
        return await Order
            .query()
            .where('id', id)
            .update({ status_id })
    }
}

module.exports = OrderRepository
