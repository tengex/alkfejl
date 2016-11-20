'use strict'

const Schema = use('Schema')

class EmployeesSchema extends Schema {

  up () {
    this.create('employees', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('fullname', 80).notNullable()
      table.integer('gender')
      table.string('email', 254).notNullable().unique()
      table.string('telephone', 12)
      table.string('password', 60).notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('employees')
  }

}

module.exports = EmployeesSchema
