'use strict'

const Lucid = use('Lucid')

class Trip extends Lucid {
    static get rules() {
        return {
            from_site: 'required',
            to_site: 'required|different:from_site',
            employee: 'required',
            shipment: 'required|above:0',
            vehicle: 'required'
        }
    }
}

module.exports = Trip