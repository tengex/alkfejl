'use strict'

const Lucid = use('Lucid')

class Vehicle extends Lucid {
    static get rules() {
        return {
            license_plate: 'required|unique:vehicles',
            manufacturer: 'required'
        }
    }

}

module.exports = Vehicle
