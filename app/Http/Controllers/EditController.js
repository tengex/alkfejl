'use strict'

const Validator = use('Validator')
const Hash = use('Hash')
const Employee = use('App/Model/Employee')

class EditController {
    * edit(req, res) {
        try {
            const entityType = req.param('name');

            if (req.param('name') == "employee") {
                if (req.currentUser.username == "Admin" || req.currentUser.id == req.param('id')) {
                    var entity = yield Employee.findBy('id', req.param('id'));
                }
                else {
                    yield res.sendView('errors.permissionError');
                }
            }

            if (entity) {
                yield res.sendView('edit', {
                    entity: entity.toJSON(),
                    entityType
                });
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
        }
        res.redirect('/');
    }
}

module.exports = EditController
