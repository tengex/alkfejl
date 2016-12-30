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
                var entity = yield Employee.findBy('id', req.param('id'));
                const trips = yield Database.select('*').from('trips').where('employee', entity.username);
                for (var i in trips) {
                    if (trips[i].end_date == null) {
                        hasUnclosedTrip = true;
                    }
                }
                if (!hasUnclosedTrip && entity.is_active) {
                    entity.is_active = false;
                    yield entity.save();
                    success = true;
                    res.redirect('back');
                }
            }

            else if (
                (req.param('name') == "vehicle")
                &&
                (req.currentUser.username == "Admin")
            ) {
                var entity = yield Vehicle.findBy('id', req.param('id'));

                if (entity.is_available && entity.is_active) {
                    entity.is_active = false;
                    entity.is_available = false;
                    yield entity.save();
                    success = true;
                    res.redirect('back');
                }
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

    * ajaxInactivate(req, res) {
        var success = false;
        if (
            (req.param('name') == "employee" && req.param('id') != 1)
            &&
            (req.currentUser.username == "Admin")
        ) {
            var hasUnclosedTrip = false;
            var entity = yield Employee.findBy('id', req.param('id'));
            const trips = yield Database.select('*').from('trips').where('employee', entity.username);
            for (var i in trips) {
                if (trips[i].end_date == null) {
                    hasUnclosedTrip = true;
                }
            }
            if (!hasUnclosedTrip && entity.is_active) {
                entity.is_active = false;
                yield entity.save();
                success = true;
            }
        }

        else if (
            (req.param('name') == "vehicle")
            &&
            (req.currentUser.username == "Admin")
        ) {
            var entity = yield Vehicle.findBy('id', req.param('id'));

            if (entity.is_available && entity.is_active) {
                entity.is_active = false;
                entity.is_available = false;
                yield entity.save();
                success = true;
            }
        }

        if (!success) {
            yield res.ok({
                message: 'Hiba az inaktiválásnál!'
            });
        } else {
            yield res.ok({
                message: 'Az inaktiválás sikerült!'
            });
        }
        return;
    }

    * activate(req, res) {
        try {
            var success = false;
            if (
                (req.param('name') == "employee" && req.param('id') != 1)
                &&
                (req.currentUser.username == "Admin")
            ) {
                var entity = yield Employee.findBy('id', req.param('id'));
                if (!entity.is_active) {
                    entity.is_active = true;
                    yield entity.save();
                    success = true;
                    res.redirect('back');
                }
            }

            else if (
                (req.param('name') == "vehicle")
                &&
                (req.currentUser.username == "Admin")
            ) {
                var entity = yield Vehicle.findBy('id', req.param('id'));

                if (!entity.is_available && !entity.is_active) {
                    entity.is_active = true;
                    entity.is_available = true;
                    yield entity.save();
                    success = true;
                    res.redirect('back');
                }
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

    * ajaxActivate(req, res) {
        var success = false;
        if (
            (req.param('name') == "employee" && req.param('id') != 1)
            &&
            (req.currentUser.username == "Admin")
        ) {
            var entity = yield Employee.findBy('id', req.param('id'));
            if (!entity.is_active) {
                entity.is_active = true;
                yield entity.save();
                success = true;
            }
        }

        else if (
            (req.param('name') == "vehicle")
            &&
            (req.currentUser.username == "Admin")
        ) {
            var entity = yield Vehicle.findBy('id', req.param('id'));

            if (!entity.is_available && !entity.is_active) {
                entity.is_active = true;
                entity.is_available = true;
                yield entity.save();
                success = true;
            }
        }

        if (!success) {
            yield res.ok({
                message: 'Hiba az aktiválásnál!'
            });
        } else {
            yield res.ok({
                message: 'Az aktiválás sikerült!'
            });
        }
        return;
    }
}

module.exports = ActivateController
