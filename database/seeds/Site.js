'use strict'

const Factory = use('Factory')
const Database = use('Database')

class SiteSeeder {

  * run () {
    // run model/database factories here
    const id = yield Database
      .table('sites')
      .insert([
        { name: "Telep_A"},
        { name: "Telep_B"},
        { name: "Telep_C"},
        { name: "Telep_D"}
      ]);
  }

}

module.exports = SiteSeeder
