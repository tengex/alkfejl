'use strict'

const Schema = use('Schema')

class SiteInfosSchema extends Schema {

  up () {
    this.create('site_infos', (table) => {
      table.increments()
      table.integer('site_id').unique().notNullable()
      table.string('country', 80)
      table.string('city', 80)
      table.string('address', 80)
      table.string('zip', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('site_infos')
  }

}

module.exports = SiteInfosSchema
