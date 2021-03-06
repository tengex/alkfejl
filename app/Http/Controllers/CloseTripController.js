'use strict'

const Trip = use('App/Model/Trip')
const Vehicle = use('App/Model/Vehicle')

class CloseTripController {
    * closeTrip(req, res) {
        try {
            const referer = req.request.headers.referer;
            const id = req.param('id');
            var success = false;
            var trip = yield Trip.findBy('id', id);
            var vehicle = yield Vehicle.findBy('license_plate', trip.vehicle);
            if (
                (
                    req.currentUser.is_active &&
                    trip.employee == req.currentUser.username &&
                    trip.end_date == null
                )
                ||
                (
                    req.currentUser.username == "Admin" &&
                    trip.end_date == null
                )
            ) {
                var d = new Date();
                trip.end_date = Math.floor(d.getTime() / 1000);
                vehicle.is_available = true;
                yield trip.save();
                yield vehicle.save();
                res.redirect(referer);
                success = true;
            }

            if (!success) {
                yield res.sendView('errors.permissionError');
            }
            return;
        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }

    * ajaxCloseTrip(req, res) {
        const id = req.param('id');
        var success = false;
        var trip = yield Trip.findBy('id', id);
        var vehicle = yield Vehicle.findBy('license_plate', trip.vehicle);
        if (
            (
                req.currentUser.is_active &&
                trip.employee == req.currentUser.username &&
                trip.end_date == null
            )
            ||
            (
                req.currentUser.username == "Admin" &&
                trip.end_date == null
            )
        ) {
            var d = new Date();
            trip.end_date = Math.floor(d.getTime() / 1000);
            vehicle.is_available = true;
            yield trip.save();
            yield vehicle.save();
            success = true;
        }

        if (!success) {
            yield res.ok({
                message: 'Hiba a túra lezárásánál!'
            });
        }
        else {
            yield res.ok({
                message: 'A túra lezárása sikerült!'
            });
        }
        return;
    }
}

module.exports = CloseTripController
