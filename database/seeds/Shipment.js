'use strict'

const Factory = use('Factory')
const Database = use('Database')

class ShipmentSeeder {

  * run() {
    // run model/database factories here
    const id = yield Database
      .table('shipments')
      .insert([
        { summary: "2fő felnőtt;\n3fő gyerek;\n", type: "Utasok", weight: "250kg"},
        { summary: "10fő munkás;\n2fő főnök;\n", type: "Utasok", weight: "1060kg"},
        { summary: "1db kutya;\n1db macska;\n", type: "Állatok", weight: ""}
      ]);
  }

}

module.exports = ShipmentSeeder
