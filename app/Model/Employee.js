'use strict'

const Lucid = use('Lucid')

class Employee extends Lucid {
    static get rules() {
        return {
            username: 'required|unique:user|min:2|max:20',
            fullname: 'required',
            email: 'required|email|unique:users',
            password: 'required',
            password2: 'required|same:password',
        }
    }

    apiTokens() {
        return this.hasMany('App/Model/Token')
    }

}

module.exports = Employee
