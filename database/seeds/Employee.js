'use strict'

const Hash = use('Hash')
const Factory = use('Factory')
const Database = use('Database')

class EmployeeSeeder {

  * run() {
    const id = yield Database
      .table('employees')
      .insert([
        { username: "Admin", fullname: "Admin", email: "admin@admin.com", telephone: "", password: yield Hash.make("admin"), is_active: true },
        { username: "MathGa", fullname: "Mathilde Gagliardi", email: "mathga@smth.com", telephone: "+369910021", password: yield Hash.make("pw"), is_active: false },
        { username: "DeidGe", fullname: "Deidra Geter", email: "deidge@smth.com", telephone: "+369910022", password: yield Hash.make("pw"), is_active: true },
        { username: "GastHa", fullname: "Gaston Hanus", email: "gastha@smth.com", telephone: "+369910023", password: yield Hash.make("pw"), is_active: false },
        { username: "JiPe", fullname: "Ji Peterman", email: "jipe@smth.com", telephone: "+369910024", password: yield Hash.make("pw"), is_active: true },
        { username: "AlmeMu", fullname: "Almeda Mudge", email: "almemu@smth.com", telephone: "+369910025", password: yield Hash.make("pw"), is_active: true },
        { username: "FlavMa", fullname: "Flavia Matsuo", email: "flavma@smth.com", telephone: "+369910026", password: yield Hash.make("pw"), is_active: true },
        { username: "SandEn", fullname: "Sandi Engelking", email: "sanden@smth.com", telephone: "+369910027", password: yield Hash.make("pw"), is_active: true },
        { username: "RickGr", fullname: "Ricky Grindle", email: "rickgr@smth.com", telephone: "+369910028", password: yield Hash.make("pw"), is_active: true },
        { username: "GenaKe", fullname: "Genaro Keeble", email: "genake@smth.com", telephone: "+369910029", password: yield Hash.make("pw"), is_active: true },
        { username: "BretKu", fullname: "Bret Kull", email: "bretku@smth.com", telephone: "+369910030", password: yield Hash.make("pw"), is_active: true }
      ]);
  }

}

module.exports = EmployeeSeeder
