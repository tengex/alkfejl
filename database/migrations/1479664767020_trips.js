'use strict'

const Schema = use('Schema')

class TripsSchema extends Schema {

  up () {
    this.create('trips', (table) => {
      table.increments()
      table.string('from_site').notNullable()
      table.string('to_site').notNullable()
      table.string('employee').notNullable()
      table.integer('shipment').notNullable()
      table.string('vehicle').notNullable()
      table.timestamp('start_date')
      table.timestamp('end_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('trips')
  }

}

module.exports = TripsSchema
