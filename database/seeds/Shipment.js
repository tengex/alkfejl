'use strict'

const Factory = use('Factory')
const Database = use('Database')

class ShipmentSeeder {

  * run() {
    // run model/database factories here
    const id = yield Database
      .table('shipments')
      .insert([
        { summary: "Első szállítmány", type: "Utasok", weight: "30*80kg"},
        { summary: "Második", type: "Utasok", weight: "1000kg"}
      ]);
  }

}

module.exports = ShipmentSeeder
