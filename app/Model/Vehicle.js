'use strict'

const Lucid = use('Lucid')

class Vehicle extends Lucid {
    static get rules() {
        return {
            license_plate: 'required|unique:vehicles',
            manufacturer: 'required'
        }
    }

    trips() {
        return this.hasMany('App/Model/Trip', "license_plate", "vehicle");
    }

}

module.exports = Vehicle
