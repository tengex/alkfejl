'use strict'

const Factory = use('Factory')
const Database = use('Database')

class SiteSeeder {

  * run () {
    // run model/database factories here
    const id = yield Database
      .table('sites')
      .insert([
        { name: "Telep_A", country: "HU", city: "Budapest", address: "X utca 50.", zip: "1111"},
        { name: "Telep_B", country: "HU", city: "Miskolc", address: "Y utca 21.", zip: "2222"},
        { name: "Telep_C", country: "HU", city: "Salgótarján", address: "Z utca 75.", zip: "3333"},
        { name: "Telep_D", country: "HU", city: "Kecskemét", address: "W utca 34.", zip: "4444"}
      ]);
  }

}

module.exports = SiteSeeder
