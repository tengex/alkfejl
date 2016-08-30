'use strict'

const Schema = use('Schema')

class MovieActorSchema extends Schema {

  up () {
    this.create('actor_movie', (table) => {
      table.increments();
      table.integer('movie_id').unsigned().references('movies.id')
      table.integer('actor_id').unsigned().references('actors.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('actor_movie')
  }

}

module.exports = MovieActorSchema
