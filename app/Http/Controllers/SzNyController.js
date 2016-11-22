'use strict'

const Validator = use('Validator')
const Hash = use('Hash')
const Database = use('Database')
const Employee = use('App/Model/Employee')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')
const Shipment = use('App/Model/Shipment')

class SzNyController {
    * inactivate(req, res) {
        if (req.param('name') == "employee") {
            var entity = yield Employee.findBy('id', req.param('id'));
            entity.is_active = false;
            yield entity.save();
        }

        res.redirect('back');
    }

    * activate(req, res) {
        if (req.param('name') == "employee") {
            var entity = yield Employee.findBy('id', req.param('id'));
            entity.is_active = true;
            yield entity.save();
        }

        res.redirect('back');
    }

    * edit(req, res) {
        const entityType = req.param('name');

        if (req.param('name') == "employee") {
            var entity = yield Employee.findBy('id', req.param('id'));
        }

        yield res.sendView('edit', {
            entity: entity.toJSON(),
            entityType
        });


    }


    * editSubmit(req, res) {
        var post = req.post();
        if (req.param('name') == "employee") {
            var entity = yield Employee.findBy('id', req.param('id'));
            entity.username = post.username;
            entity.fullname = post.fullname;
            entity.email = post.email;
            entity.telephone = post.telephone;
            entity.password = post.password;
            entity.password2 = post.password2;

            const validation = yield Validator.validateAll(entity, Employee.rulesEdit)
            if (validation.fails()) {
                yield req
                    .withOut('password', 'password2')
                    .andWith({ errors: validation.messages() })
                    .flash()

                res.redirect('back')
                return
            }

            entity.password2 = undefined;
            entity.password = yield Hash.make(entity.password);

            yield entity.save();
        }

        res.redirect('/');
    }
    
    * dev(req, res) {
        /*const select = yield Database.select('*').from('employees');
        yield res.sendView('dev', {
            select
        });*/
        console.log("********************DEV********************")
        //console.log(select);
        console.log(req.currentUser.username);
    }
    
    * createNewSubmit(req, res) {
        var post = req.post();

        try {
            if (post.objectType == "employee") {
                var employeeData = {
                    username: post.username,
                    fullname: post.fullname,
                    email: post.email,
                    telephone: post.telephone,
                    password: post.password,
                    password2: post.password2
                };

                const validation = yield Validator.validateAll(employeeData, Employee.rules);

                if (validation.fails()) {
                    yield req
                        .withOut('password', 'password2')
                        .andWith({ errors: validation.messages() })
                        .flash();

                    res.redirect('back');
                    return;
                }

                employeeData.password2 = undefined;
                employeeData.password = yield Hash.make(employeeData.password);

                var employee = yield Employee.create(employeeData);
                yield employee.save();
            }
            else if (post.objectType == "vehicle") {
                var vehicleData = {
                    license_plate: post.license_plate,
                    manufacturer: post.manufacturer,
                    type: post.type,
                    category: post.category
                };

                const validation = yield Validator.validateAll(vehicleData, Vehicle.rules);

                if (validation.fails()) {
                    yield req
                        .without()
                        .andWith({ errors: validation.messages() })
                        .flash();

                    res.redirect('back');
                    return;
                }

                var vehicle = yield Vehicle.create(vehicleData);
                yield vehicle.save();
            }
            else if (post.objectType == "trip") {
                var tripData = {
                    from_site: post.from_site,
                    to_site: post.to_site,
                    employee: post.employee,
                    shipment: post.shipment,
                    vehicle: post.vehicle
                };

                const validation = yield Validator.validateAll(tripData, Trip.rules);

                if (validation.fails()) {
                    yield req
                        .without()
                        .andWith({ errors: validation.messages() })
                        .flash();

                    res.redirect('back');
                    return;
                }

                var trip = yield Trip.create(tripData);
                yield trip.save();
            }
            else if (post.objectType == "shipment") {
                var shipmentData = {
                    summary: post.summary,
                    type: post.type,
                    weight: post.weight
                };

                const validation = yield Validator.validateAll(shipmentData, Shipment.rules);

                if (validation.fails()) {
                    yield req
                        .without()
                        .andWith({ errors: validation.messages() })
                        .flash();

                    res.redirect('back');
                    return;
                }

                var shipment = yield Shipment.create(shipmentData);
                yield shipment.save();
            }

        }
        
        catch (e) {
            yield req.with({ errors: [{ message: "Hiba történt (" + e.message + ")!" }] }).flash();
            res.redirect('back');
        }

        switch (post.objectType) {
            case "employee":
                res.redirect('/list/employees');
                break;
            case "vehicle":
                res.redirect('/list/vehicles');
                break;
            case "trip":
                res.redirect('/list/trips');
                break;
            case "shipment":
                res.redirect('/list/shipments');
                break;
        }
    }

    * createNew(req, res) {
        const entityTypesArray = ["employee", "vehicle", /*"site",*/ "trip", "shipment"];

        if (-1 != entityTypesArray.indexOf(req.param('name'))) {
            const entityType = req.param('name');
            yield res.sendView('new', {
                entityType
            });
        }
    }

    * list(req, res) {
        const entityTypesArray = ["employees", "vehicles", "sites", "trips", "shipments"];
        const entityType = req.param('name');

        if (-1 != entityTypesArray.indexOf(req.param('name'))) {
            const entities = yield Database.select('*').from(req.param('name'));
            yield res.sendView('list', {
                entities,
                entityType
            });
        }
    }

}

module.exports = SzNyController
