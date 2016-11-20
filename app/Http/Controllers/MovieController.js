'use strict'

const Database = use('Database')
const Movie = use('App/Model/Movie')
const Validator = use('Validator')

class MovieController {

  * index (request, response) {
    
     const movies = yield Database.from('movies').select('*');
    // const movies = yield Movie.all();
    //const movies = yield Movie.with('actors').fetch();
    
    // console.log(movies) //lodash gyűjtemény
    
    // yield response.send(movies);
    
    yield response.sendView('index', {
       movies
      //movies: movies.toJSON()
    })
  }

  * showNewForm (request, response) {
    yield response.sendView('newForm')
  }

  * saveNew (request, response) {
    const postData = request.only('title', 'releaseDate', 'lengthInMinutes')
    // const postData = request.all()

    // const rules = {
    //   title: 'required',
    //   releaseDate: 'required',
    //   lengthInMinutes: 'required',
    // }

    const rules = {
      lengthInMinutes: 'to_int',
    }
    
    const sanitizedData = Validator.sanitize(postData, rules)

    const validation = yield Validator.validateAll(sanitizedData, Movie.rules)

    if (validation.fails()) {
      yield request
          .withOnly('title', 'releaseDate', 'lengthInMinutes')
          .andWith({ errors: validation.messages() })
          .flash()
      response.redirect('back')
      return
    }

    yield Movie.create(postData)
    response.redirect('/')
  }

}

module.exports = MovieController
