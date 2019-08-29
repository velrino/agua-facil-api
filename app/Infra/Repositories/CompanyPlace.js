'use strict'

const DefaultRepository = use('./Default');
const CompanyPlace = use('App/Models/CompanyPlace');
const MapsService = use('App/Infra/Services/Maps');

class CompanyPlaceRepository extends DefaultRepository {
  async create(params) {
    return await CompanyPlace.create(params);
  }

  async update(id, params) {
    return await CompanyPlace.query().where('id', id).update(params);
  }

  async get() {
    return await CompanyPlace.query().paginate(1, 10);
  }

  queryNearby(startQuery, lat, lng, distance = 1) {
    const { minLat, maxLat, minLng, maxLng } = this.getNearby(lat, lng, distance);
    return startQuery.whereBetween('latitude', [minLat, maxLat])
      .whereBetween('longitude', [minLng, maxLng])
  }

  async getWhereRawJsonExtract(params = {}) {
    let startQuery = CompanyPlace.query().with('company')
      .withCount('ordersDone as total_order_done', (builder) => {
        builder.where('status_id', 5)
      })

    const have = {
      address: params.hasOwnProperty('address'),
      itens: params.hasOwnProperty('itens'),
      location: (params.hasOwnProperty('lat') && params.hasOwnProperty('lng') && params.hasOwnProperty('distance')),
      order: params.hasOwnProperty('order'),
      page: params.hasOwnProperty('page'),
      payment: params.hasOwnProperty('payment'),
      period: params.hasOwnProperty('period'),
      company_id: params.hasOwnProperty('company_id'),
    }

    if (have.order) {
      const order = params['order'].split(",");
      startQuery.orderBy(order[0], order[1]);
    }

    let query = [];
    if (have.company_id)
      query = startQuery.where('company_id', params['company_id']);
    if (have.payment)
      query = this.whereByJson(params['payment'].split(","), 'payment');
    if (have.period)
      query = this.whereByJson(params['period'].split(","), 'period');
    if (have.address) {
      const maps = await new MapsService().getLocationByAddres(params['address']);
      if (maps !== undefined) {
        const { lat, lng } = maps.geometry.location;
        startQuery = this.queryNearby(startQuery, lat, lng, params['distance'])
      }
    } else if (have.location) {
      startQuery = this.queryNearby(startQuery, params['lat'], params['lng'], params['distance'])
    }

    return await this.queryWhereRaw(startQuery, query)
      .paginate(
        (have.page) ? params['page'] : 1,
        (have.itens) ? params['itens'] : 20
      );
  }

  whereByName(param = null, query = []) {
    if (param != null) {
      query.push(this.rawJsonExtract('name_social', param));
      query.push(this.rawJsonExtract('name_fantasy', param));
    }

    return query;
  }

  whereByJson(param = [], column, type = 'LIKE', query = []) {
    for (let index = 0; index < param.length; index++) {
      query.push(this.rawJsonExtract(column, param[index], type));
    }
    return query;
  }

  getNearby($lat, $lng, $distance = 1) {
    const $radius = 6371.009;

    return {
      minLat: parseFloat($lat - this.rad2deg($distance / $radius)),
      maxLat: parseFloat($lat + this.rad2deg($distance / $radius)),
      minLng: parseFloat($lng - this.rad2deg($distance / $radius / Math.cos(this.deg2rad($lat)))),
      maxLng: parseFloat($lng + this.rad2deg($distance / $radius / Math.cos(this.deg2rad($lat)))),
    };
  }

  deg2rad(angle) {
    return angle * 0.017453292519943295
  }

  rad2deg(angle) {
    return angle * 57.29577951308232
  }
}

module.exports = CompanyPlaceRepository
