'use strict'

const Lucid = use('Lucid')

class Employee extends Lucid {
    static get rules() {
        return {
            username: 'required|unique:employees|min:2',
            fullname: 'required',
            //email: 'required|email|unique:employees',
            email: 'required|email',
            password: 'required',
            password2: 'required|same:password',
        }
    }

    static get rulesEdit() {
        return {
            fullname: 'required',
            email: 'required|email',
            password: 'required',
            password2: 'required|same:password',
        }
    }

    apiTokens() {
        return this.hasMany('App/Model/Token')
    }

}

module.exports = Employee
