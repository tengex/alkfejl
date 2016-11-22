'use strict'

const Factory = use('Factory')
const Database = use('Database')

class VehicleSeeder {

  * run() {
    // run model/database factories here
    const id = yield Database
      .table('vehicles')
      .insert([
        { license_plate: "BPI-729", manufacturer: "IKARUS", type: "280", category: "Busz", is_active: true, is_available: true },
        { license_plate: "HHY-826", manufacturer: "IKARUS", type: "E95", category: "Busz", is_active: true, is_available: true },
        { license_plate: "BPO-025", manufacturer: "IKARUS", type: "280", category: "Busz", is_active: false, is_available: true },
        { license_plate: "BPI-117", manufacturer: "IKARUS", type: "435", category: "Busz", is_active: true, is_available: true },
        { license_plate: "DUM-015", manufacturer: "IKARUS", type: "250", category: "Busz", is_active: true, is_available: true },
        { license_plate: "BSN-552", manufacturer: "IKARUS", type: "256", category: "Busz", is_active: true, is_available: false },
        { license_plate: "ACH-131", manufacturer: "IKARUS", type: "266", category: "Busz", is_active: false, is_available: true },
        { license_plate: "GEX-808", manufacturer: "IKARUS", type: "280", category: "Busz", is_active: true, is_available: true },
        { license_plate: "NBZ-088", manufacturer: "IKARUS", type: "250", category: "Busz", is_active: true, is_available: true }
      ]);
  }

}

module.exports = VehicleSeeder
