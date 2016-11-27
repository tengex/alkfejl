'use strict'

const Employee = use('App/Model/Employee')
const Vehicle = use('App/Model/Vehicle')
const Database = use('Database')

class ActivateController {
    * inactivate(req, res) {
        try {
            var success = false;
            if (
                (req.param('name') == "employee" && req.param('id') != 1)
                &&
                (req.currentUser.username == "Admin")
            ) {
                var hasUnclosedTrip = false;
                var vehicle = yield Employee.findBy('id', req.param('id'));
                const trips = yield Database.select('*').from('trips').where('employee', vehicle.username);
                for (var i in trips) {
                    if (trips[i].end_date == null) {
                        hasUnclosedTrip = true;
                    }
                }
                if (!hasUnclosedTrip) {
                    vehicle.is_active = false;
                    yield vehicle.save();
                    success = true;
                    res.redirect('back');
                }
            }

            else if (
                (req.param('name') == "vehicle")
                &&
                (req.currentUser.username == "Admin")
            ) {
                var vehicle = yield Vehicle.findBy('id', req.param('id'));

                if (vehicle.is_available && vehicle.is_active) {
                    vehicle.is_active = false;
                    vehicle.is_available = false;
                    yield vehicle.save();
                    success = true;
                    res.redirect('back');
                }
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

    * activate(req, res) {
        try {
            var success = false;
            if (
                (req.param('name') == "employee" && req.param('id') != 1)
                &&
                (req.currentUser.username == "Admin")
            ) {
                var employee = yield Employee.findBy('id', req.param('id'));
                employee.is_active = true;
                yield employee.save();
                success = true;
                res.redirect('back');
            }

            else if (
                (req.param('name') == "vehicle")
                &&
                (req.currentUser.username == "Admin")
            ) {
                var vehicle = yield Vehicle.findBy('id', req.param('id'));

                if (!vehicle.is_available && !vehicle.is_active) {
                    vehicle.is_active = true;
                    vehicle.is_available = true;
                    yield vehicle.save();
                    success = true;
                    res.redirect('back');
                }
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
}

module.exports = ActivateController
