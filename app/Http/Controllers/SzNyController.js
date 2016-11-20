'use strict'

const Hash = use('Hash')
const Database = use('Database')
//const Employee = use('App/Model/Employee')

class SzNyController {
    * list(req, res) {
        yield Database
        .table('employees')
        .insert({username: req.param('name'), fullname: 'valami nev', gender: 1, email: req.param('name')+"@email.com", telephone: "+36702239888", password: yield Hash.make(req.param('name'))})

        const employees = yield Database.select('*').from('employees');
        yield res.sendView('list', {
            employees
            //movies: movies.toJSON()
        })
    }

}

module.exports = SzNyController
