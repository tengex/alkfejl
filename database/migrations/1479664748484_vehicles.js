'use strict'

const Schema = use('Schema')

class VehiclesSchema extends Schema {

  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.string('license_plate', 10).notNullable().unique()
      table.string('manufacturer', 80)
      table.string('type', 80)
      table.string('category', 80)
      table.boolean('is_available').notNullable().defaultTo(true)
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }

}

module.exports = VehiclesSchema
