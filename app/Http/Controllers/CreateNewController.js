'use strict'

const Validator = use('Validator')
const Hash = use('Hash')
const Employee = use('App/Model/Employee')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')
const Shipment = use('App/Model/Shipment')

class CreateNewController {
    * createNew(req, res) {
        try {
            const entityType = req.param('name');
            const entityFilter = req.param('filter');
            var success = false;

            if (
                (
                    (entityType == "employee" && entityFilter == undefined ||
                        entityType == "trip" && entityFilter == undefined ||
                        entityType == "vehicle" && entityFilter == undefined)
                    &&
                    (req.currentUser.username == "Admin")
                )
                ||
                (
                    (entityType == "shipment" && entityFilter == undefined ||
                        entityType == "trip" && entityFilter == "own")
                    &&
                    (req.currentUser.username == "Admin" || req.currentUser.is_active)
                )
            ) {
                yield res.sendView('new', {
                    entityType,
                    entityFilter
                });
                success = true;
            }

            if (!success) {
                yield res.sendView('errors.permissionError');
            }

            yield res.sendView('errors.unexpectedError');
        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
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
                var d = new Date();
                var tripData = {
                    from_site: post.from_site,
                    to_site: post.to_site,
                    employee: post.employee,
                    shipment: post.shipment,
                    vehicle: post.vehicle,
                    start_date: Math.floor(d.getTime() / 1000)
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
                if (req.param('filter') == undefined) {
                    res.redirect('/list/trips');
                } else if (req.param('filter') == "own") {
                    res.redirect('/list/trips/own');
                }
                break;
            case "shipment":
                res.redirect('/list/shipments');
                break;
        }
    }
}

module.exports = CreateNewController
