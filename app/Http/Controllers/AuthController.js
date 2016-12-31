'use strict'

const Database = use('Database')

class AuthController {

    * login(req, res) {
        yield res.sendView('loginForm');
    }

    * loginSubmit(req, res) {
        try {
            var post = req.post();
            yield req.auth.attempt(post.username, post.password);
            res.redirect('/');
        } catch (e) {
            yield req
                .withOut('password')
                .andWith({
                    errors: [{
                        message: 'Bad credentials'
                    }]
                })
                .flash()
            res.redirect('back')
            console.log(e);
            return
        }
    }

    * ajaxLogin(req, res) {
        try {
            var post = req.post();
            yield req.auth.attempt(post.username, post.password);
            res.ok({
                success: true
            });
        } catch (e) {
            res.ok({
                success: false
            })
        }
    }

    * logout(req, res) {
        yield req.auth.logout();
        res.redirect('/');
    }

}

module.exports = AuthController
