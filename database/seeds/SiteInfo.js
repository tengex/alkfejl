'use strict'

const Factory = use('Factory')
const Database = use('Database')

class SiteInfoSeeder {

  * run () {
    // run model/database factories here
    const id = yield Database
      .table('site_infos')
      .insert([
        { site_id: 1, country: "HU", city: "Budapest", address: "X utca 50.", zip: "1111"},
        { site_id: 2, country: "HU", city: "Miskolc", address: "Y utca 21.", zip: "2222"},
        { site_id: 3, country: "HU", city: "Salgótarján", address: "Z utca 75.", zip: "3333"},
        { site_id: 4, country: "HU", city: "Kecskemét", address: "W utca 34.", zip: "4444"}
      ]);
  }

}

module.exports = SiteInfoSeeder
