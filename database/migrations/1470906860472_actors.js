'use strict'

const Schema = use('Schema')

class ActorsSchema extends Schema {

  up () {
    this.create('actors', (table) => {
      table.increments()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.date('dateOfBirth')
      table.timestamps()
    })
  }

  down () {
    this.drop('actors')
  }

}

module.exports = ActorsSchema
