'use strict'

const Validator = use('Validator')
const Hash = use('Hash')
const Employee = use('App/Model/Employee')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')
const Shipment = use('App/Model/Shipment')

class EditController {
    * edit(req, res) {
        try {
            const entityType = req.param('name');
            const entityID = req.param('id');
            var success = false;

            if (
                (
                    (entityType == "employee" && entityID == req.currentUser.id)
                    &&
                    (req.currentUser.username == "Admin" || req.currentUser)
                )
                ||
                (
                    (entityType == "employee" && entityID != req.currentUser.id)
                    &&
                    (req.currentUser.username == "Admin")
                )
            ) {
                var entity = yield Employee.findBy('id', entityID);
                yield res.sendView('edit', {
                    entity: entity.toJSON(),
                    entityType
                });
                success = true;
            }

            else if (
                (entityType == "vehicle" && entityID)
                &&
                (req.currentUser.username == "Admin")
            ) {
                var entity = yield Vehicle.findBy('id', entityID);
                yield res.sendView('edit', {
                    entity: entity.toJSON(),
                    entityType
                });
                success = true;
            }

            else if (
                (entityType == "trip" && entityID)
                &&
                (req.currentUser.username == "Admin")
            ) {
                var entity = yield Trip.findBy('id', entityID);
                yield res.sendView('edit', {
                    entity: entity.toJSON(),
                    entityType
                });
                success = true;
            }

            else if (
                (entityType == "shipment" && entityID)
                &&
                (req.currentUser.username == "Admin")
            ) {
                var entity = yield Shipment.findBy('id', entityID);
                yield res.sendView('edit', {
                    entity: entity.toJSON(),
                    entityType
                });
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
            res.redirect('/list/employees');
        }

        else if (req.param('name') == "vehicle") {
            var entity = yield Vehicle.findBy('id', req.param('id'));
            entity.license_plate = post.license_plate;
            entity.manufacturer = post.manufacturer;
            entity.type = post.type;
            entity.category = post.category;

            const validation = yield Validator.validateAll(entity, Vehicle.rulesEdit);
            if (validation.fails()) {
                yield req
                    .without()
                    .andWith({ errors: validation.messages() })
                    .flash();

                res.redirect('back');
                return;
            }

            yield entity.save();
            res.redirect('/list/vehicles');
        }

        else if (req.param('name') == "trip") {
            var entity = yield Trip.findBy('id', req.param('id'));
            entity.from_site = post.from_site;
            entity.to_site = post.to_site;
            entity.employee = post.employee;
            entity.shipment = post.shipment;
            entity.vehicle = post.vehicle;
            entity.start_date = post.start_date;
            entity.end_date = post.end_date;

            const validation = yield Validator.validateAll(entity, Trip.rulesEdit);
            if (validation.fails()) {
                yield req
                    .without()
                    .andWith({ errors: validation.messages() })
                    .flash();

                res.redirect('back');
                return;
            }

            yield entity.save();
            res.redirect('/list/trips');
        }

        else if (req.param('name') == "shipment") {
            var entity = yield Shipment.findBy('id', req.param('id'));
            entity.summary = post.summary;
            entity.type = post.type;
            entity.weight = post.weight;

            const validation = yield Validator.validateAll(entity, Shipment.rulesEdit);
            if (validation.fails()) {
                yield req
                    .without()
                    .andWith({ errors: validation.messages() })
                    .flash();

                res.redirect('back');
                return;
            }

            yield entity.save();
            res.redirect('/list/shipments');
        }
    }
}

module.exports = EditController
