'use strict'

const Schema = use('Schema')

class ShipmentsSchema extends Schema {

  up () {
    this.create('shipments', (table) => {
      table.increments()
      table.string('summary')
      table.string('type')
      table.string('weight')
      table.timestamps()
    })
  }

  down () {
    this.drop('shipments')
  }

}

module.exports = ShipmentsSchema
