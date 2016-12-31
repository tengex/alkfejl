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

    /*static get rulesEdit() {
        return {
            from_site: 'required',
            to_site: 'required|different:from_site',
            employee: 'required',
            shipment: 'required|above:0',
            vehicle: 'required'
        }
    }*/

    /*vehicle() {
        return this.belongsTo('App/Model/Vehicle');
    }*/
}

module.exports = Trip