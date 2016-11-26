'use strict'

const Schema = use('Schema')

class SitesSchema extends Schema {

  up () {
    this.create('sites', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('sites')
  }

}

module.exports = SitesSchema
