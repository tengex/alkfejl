'use strict'

const Lucid = use('Lucid')

class Vehicle extends Lucid {
    static get rules() {
        return {
            license_plate: 'required|unique:vehicles',
            manufacturer: 'required'
        }
    }

    static get rulesEdit() {
        return {
            license_plate: 'required',
            manufacturer: 'required'
        }
    }
}

module.exports = Vehicle
