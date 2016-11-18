'use strict'

const Database = use('Database')

class AuthController {

    * showLoginForm(request, response) {
        yield response.sendView('loginForm')
    }

    * handleLogin(request, response) {
        const email = request.input('email')
        const password = request.input('password')
        // Database.on('sql', console.log)
        // console.log(email, password)
        try {
            const login = yield request.auth.attempt(email, password)
    
            if (login) {
                response.redirect('/');
                // response.send('Logged In Successfully')
                return
            }
        }
        finally {
            response.unauthorized('Invalid credentails')
        }
    }

    * logout (request, response) {
        yield request.auth.logout();
        response.redirect('/');
    }

}

module.exports = AuthController
