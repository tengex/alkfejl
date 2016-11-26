'use strict'

const Factory = use('Factory')
const Database = use('Database')

class TripSeeder {

  * run() {
    // run model/database factories here
    const id = yield Database
      .table('trips')
      .insert([
        { from_site: "Telep_A", to_site: "Telep_B", employee: "DeidGe", shipment: 1, vehicle: "BPI-729", start_date: 1477958400, end_date: 1477972800 },
        { from_site: "Telep_B", to_site: "Telep_A", employee: "DeidGe", shipment: 1, vehicle: "BPI-729", start_date: 1477982800, end_date: 1477992800 },
        { from_site: "Telep_C", to_site: "Telep_D", employee: "MathGa", shipment: 2, vehicle: "HHY-826", start_date: 1477948400, end_date: 1477961500 },
        { from_site: "Telep_D", to_site: "Telep_C", employee: "MathGa", shipment: 2, vehicle: "HHY-826", start_date: 1478061500, end_date: 1478081500 },
        { from_site: "Telep_A", to_site: "Telep_C", employee: "BretKu", shipment: 1, vehicle: "BSN-552", start_date: 1479830288 },
        { from_site: "Telep_A", to_site: "Telep_D", employee: "DeidGe", shipment: 1, vehicle: "GEX-808", start_date: 1479901783 }
      ]);
  }

}

module.exports = TripSeeder
