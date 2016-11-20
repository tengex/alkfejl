'use strict'

const Hash = use('Hash')
const Database = use('Database')
//const Employee = use('App/Model/Employee')

class SzNyController {
    * saveNew(req, res) {
        var post = req.post();
        console.log(post);
        for (var line in post) {
            if (!post[line]) {
                console.log("Hianyzo adat");
                yield req.with({ errors: [{ message: "Hiányzó érték!" }] }).flash();
                res.redirect('back')
                return;
            }
        }
        try {
            if (post.objectType == "employee") {
                const id = yield Database
                    .table('employees')
                    .insert({ username: post.username, fullname: post.fullname, gender: post.gender, email: post.email, telephone: post.telephone, password: post.password });
            }
            else if (post.objectType == "vehicle") {
                const id = yield Database
                    .table('vehicles')
                    .insert({ license_plate: post.license_plate, manufacturer: post.manufacturer, type: post.type, category: post.category});
            }
            else if (post.objectType == "trip") {
                const id = yield Database
                    .table('trips')
                    .insert({ from_site: post.from_site, to_site: post.to_site, employee: post.employee, shipment: post.shipment, vehicle: post.vehicle});
            }
            else if (post.objectType == "shipment") {
                const id = yield Database
                    .table('shipments')
                    .insert({ summary: post.summary, type: post.type, weight: post.weight});
            }
            
        }
        catch (e) {
            yield req.with({ errors: [{ message: "Helytelen érték (hibaüzenet: " + e.message + ")!" }] }).flash();
            res.redirect('back');
        }
        if (post.objectType == "employee") {
            res.redirect('/list/employees');
        }
        else if (post.objectType == "vehicle") {
            res.redirect('/list/vehicles');
        }
        else if (post.objectType == "trip") {
            res.redirect('/list/trips');
        }
        else if (post.objectType == "shipment") {
            res.redirect('/list/shipments');
        }
    }
    * showNewForm(req, res) {
        const typesArray = ["employee", "vehicle", /*"site",*/ "trip", "shipment"];
        if (-1 != typesArray.indexOf(req.param('name'))) {
            const typeName = req.param('name');
            yield res.sendView('new', {
                typeName
            });
        }
    }
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
