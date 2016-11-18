'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {
  
  static get rules() {
    return {
      title: 'required',
      releaseDate: 'date_format:YYYY-MM-DD',
      lengthInMinutes: 'integer',
    }
  }
  
  actors () {
    return this.belongsToMany('App/Model/Actor')
  }
}

module.exports = Movie
