'use strict'

const Factory = use('Factory')

class MovieSeeder {

  * run () {
    const movies = yield Factory.model('App/Model/Movie').create(5)
    const actors = yield Factory.model('App/Model/Actor').create(5)
    
    yield movies.each(function * (movie) {
      yield movie.actors().attach([
        Math.floor(Math.random()*5) + 1, 
        Math.floor(Math.random()*5) + 1
      ])
    })
  }

}

module.exports = MovieSeeder
