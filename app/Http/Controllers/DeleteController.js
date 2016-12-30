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
            }
            return;
        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }

    * ajaxDeleteTrip(req, res) {
        const id = req.param('id');
        var success = false;
        var trip = yield Trip.findBy('id', id);

        if (req.currentUser.username == "Admin" &&
            trip.end_date == null) {
            var vehicle = yield Vehicle.findBy('license_plate', trip.vehicle);
            vehicle.is_available = true;
            yield vehicle.save();
            yield trip.delete();
            success = true;
        }

        if (!success) {
            yield res.ok({
                message: 'Hiba a túra törlésénél!'
            });
        }
        else {
            yield res.ok({
                message: 'A túra törlése sikerült!'
            });
        }
        return;
    }
}

module.exports = DeleteController
