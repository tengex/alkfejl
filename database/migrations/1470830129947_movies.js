'use strict'

const Schema = use('Schema')

class MoviesSchema extends Schema {

  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.date('releaseDate')
      table.integer('lengthInMinutes')
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }

}

module.exports = MoviesSchema
