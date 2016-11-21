'use strict'

const Lucid = use('Lucid')

class Shipment extends Lucid {
    static get rules() {
        return {
            summary: 'required'
        }
    }
}

module.exports = Shipment
