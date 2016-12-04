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
            } else {
                return;
            }
        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }
}

module.exports = CloseTripController
