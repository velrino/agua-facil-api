'use strict'

class MapsService {
    googleMapsClient

    constructor() {
        this.googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyBaBKMMfPD75rATU89MwJrpC9sjT_phdvI',
            Promise: Promise
        });
    }

    getLocationByAddres(address) {
        return this.googleMapsClient.geocode({ address })
            .asPromise()
            .then(response => response.json.results[0])
            .catch(err => err)
    }
}

module.exports = MapsService
