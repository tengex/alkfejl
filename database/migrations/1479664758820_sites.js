'use strict'

const Schema = use('Schema')

class SitesSchema extends Schema {

  up () {
    this.create('sites', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('country', 80)
      table.string('city', 80)
      table.string('address', 80)
      table.string('zip', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('sites')
  }

}

module.exports = SitesSchema
