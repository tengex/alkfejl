'use strict'

const Validator = use('Validator')
const Hash = use('Hash')
const Database = use('Database')
const Employee = use('App/Model/Employee')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')
const Shipment = use('App/Model/Shipment')

class SzNyController {
    * dev(req, res) {
        const select = yield Database.select('*').from('employees');
        yield res.sendView('dev', {
            select
        });
        console.log("********************DEV********************")
        console.log(select);
    }
    * saveNew(req, res) {
        var post = req.post();
        console.log(post);

        try {
            if (post.objectType == "employee") {
                var employeeData = {
                    username: post.username,
                    fullname: post.fullname,
                    gender: post.gender,
                    email: post.email,
                    telephone: post.telephone,
                    password: post.password,
                    password2: post.password2
                };

                const validation = yield Validator.validateAll(employeeData, Employee.rules)

                if (validation.fails()) {
                    yield req
                        .withOut('password', 'password2')
                        .andWith({ errors: validation.messages() })
                        .flash()

                    res.redirect('back')
                    return
                }

                delete employeeData.password2;
                employeeData.password = yield Hash.make(employeeData.password);

                var employee = yield Employee.create(employeeData);
                yield employee.save();

                //req.auth.login(user);
                /*const id = yield Database
                    .table('employees')
                    .insert({ username: post.username, fullname: post.fullname, gender: post.gender, email: post.email, telephone: post.telephone, password: post.password });*/
            }
            else if (post.objectType == "vehicle") {
                var vehicleData = {
                    license_plate: post.license_plate,
                    manufacturer: post.manufacturer,
                    type: post.type,
                    category: post.category
                };

                const validation = yield Validator.validateAll(vehicleData, Vehicle.rules)

                if (validation.fails()) {
                    yield req
                        .without()
                        .andWith({ errors: validation.messages() })
                        .flash()

                    res.redirect('back')
                    return
                }


                var vehicle = yield Vehicle.create(vehicleData);
                yield vehicle.save();

                /*const id = yield Database
                    .table('vehicles')
                    .insert({ license_plate: post.license_plate, manufacturer: post.manufacturer, type: post.type, category: post.category });*/
            }
            else if (post.objectType == "trip") {
                var tripData = {
                    from_site: post.from_site,
                    to_site: post.to_site,
                    employee: post.employee,
                    shipment: post.shipment,
                    vehicle: post.vehicle
                };

                const validation = yield Validator.validateAll(tripData, Trip.rules)

                if (validation.fails()) {
                    yield req
                        .without()
                        .andWith({ errors: validation.messages() })
                        .flash()

                    res.redirect('back')
                    return
                }


                var trip = yield Trip.create(tripData);
                yield trip.save();
                /*const id = yield Database
                    .table('trips')
                    .insert({ from_site: post.from_site, to_site: post.to_site, employee: post.employee, shipment: post.shipment, vehicle: post.vehicle });*/
            }
            else if (post.objectType == "shipment") {
                var shipmentData = {
                    summary: post.summary,
                    type: post.type,
                    weight: post.weight
                };

                const validation = yield Validator.validateAll(shipmentData, Shipment.rules)

                if (validation.fails()) {
                    yield req
                        .without()
                        .andWith({ errors: validation.messages() })
                        .flash()

                    res.redirect('back')
                    return
                }


                var shipment = yield Shipment.create(shipmentData);
                yield shipment.save();
                /*const id = yield Database
                    .table('shipments')
                    .insert({ summary: post.summary, type: post.type, weight: post.weight });*/
            }

        }
        catch (e) {
            yield req.with({ errors: [{ message: "Hiba történt (" + e.message + ")!" }] }).flash();
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
