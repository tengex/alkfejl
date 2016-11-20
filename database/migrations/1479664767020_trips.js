'use strict'

const Schema = use('Schema')

class TripsSchema extends Schema {

  up () {
    this.create('trips', (table) => {
      table.increments()
      table.integer('from_site').notNullable()
      table.integer('to_site').notNullable()
      table.integer('employee').notNullable()
      table.integer('shipment').notNullable()
      table.integer('vehicle').notNullable()
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
