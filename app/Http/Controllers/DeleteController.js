'use strict'

const Trip = use('App/Model/Trip')
const Vehicle = use('App/Model/Vehicle')

class DeleteController {
    * deleteTrip(req, res) {
        try {
            const referer = req.request.headers.referer;
            const id = req.param('id');
            var success = false;
            var trip = yield Trip.findBy('id', id);

            if (req.currentUser.username == "Admin" &&
                trip.end_date == null) {
                var vehicle = yield Vehicle.findBy('license_plate', trip.vehicle);
                vehicle.is_available = true;
                yield vehicle.save();
                yield trip.delete();
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

module.exports = DeleteController
