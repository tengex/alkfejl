'use strict'

class ProtectedController {

    * index(request, response) {
        // const user = yield request.auth.getUser()

        // if (user) {
        //     response.ok(user)
        //     return
        // }
    
        // response.unauthorized('You must login to view your profile')
        
        response.send('Vedett tartalom')
    }

}

module.exports = ProtectedController
