'use strict'

const Employee = use('App/Model/Employee')

class ActivateController {
    * inactivate(req, res) {
        try {
            if (req.currentUser.username == "Admin") {
                if (req.param('name') == "employee") {
                    var entity = yield Employee.findBy('id', req.param('id'));
                    if (entity.username == "Admin") {
                        yield res.sendView('errors.permissionError');
                    } else {
                        entity.is_active = false;
                        yield entity.save();
                    }
                }
            }
            else {
                yield res.sendView('errors.permissionError');
            }
            res.redirect('back');
        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }

    * activate(req, res) {
        try {
            if (req.currentUser.username == "Admin") {
                if (req.param('name') == "employee") {
                    var entity = yield Employee.findBy('id', req.param('id'));
                    entity.is_active = true;
                    yield entity.save();
                }
            }
            else {
                yield res.sendView('errors.permissionError');
            }
            res.redirect('back');
        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }
}

module.exports = ActivateController
