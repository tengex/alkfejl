'use strict'

const Hash = use('Hash')
const Database = use('Database')
//const Employee = use('App/Model/Employee')

class SzNyController {
    * list(req, res) {
        if (req.param('name') == "employees") {
            /*yield Database
                .table('employees')
                .insert({ username: req.param('name'), fullname: 'valami nev', gender: 1, email: req.param('name') + "@email.com", telephone: "+36702239888", password: yield Hash.make(req.param('name')) })*/

            const employees = yield Database.select('*').from('employees');
            const type = req.param('name');
            //console.log(employees);
            yield res.sendView('list', {
                employees,
                type
                //movies: movies.toJSON()
            })
        }
        else if (req.param('name') == "vehicles") {
            const vehicles = yield Database.select('*').from('vehicles');
            const type = req.param('name');
            yield res.sendView('list', {
                vehicles,
                type
            })
        }
        else if (req.param('name') == "sites") {
            const sites = yield Database.select('*').from('sites');
            const type = req.param('name');
            yield res.sendView('list', {
                sites,
                type
            })
        }
        else if (req.param('name') == "trips") {
            const trips = yield Database.select('*').from('trips');
            const type = req.param('name');
            yield res.sendView('list', {
                trips,
                type
            })
        }
        else if (req.param('name') == "shipments") {
            const shipments = yield Database.select('*').from('shipments');
            const type = req.param('name');
            yield res.sendView('list', {
                shipments,
                type
            })
        }

    }

}

module.exports = SzNyController
