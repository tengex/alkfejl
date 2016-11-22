'use strict'

const Hash = use('Hash')
const Factory = use('Factory')
const Database = use('Database')

class EmployeeSeeder {

  * run() {
    const id = yield Database
      .table('employees')
      .insert([
        { username: "Admin", fullname: "Admin", email: "admin@admin.com", telephone: "", password: yield Hash.make("admin") },
        { username: "MathGa", fullname: "Mathilde Gagliardi", email: "mathga@smth.c", telephone: "+369910021", password: yield Hash.make("pw") },
        { username: "DeidGe", fullname: "Deidra Geter", email: "deidge@smth.c", telephone: "+369910022", password: yield Hash.make("pw") },
        { username: "GastHa", fullname: "Gaston Hanus", email: "gastha@smth.c", telephone: "+369910023", password: yield Hash.make("pw") },
        { username: "JiPe", fullname: "Ji Peterman", email: "jipe@smth.c", telephone: "+369910024", password: yield Hash.make("pw") },
        { username: "AlmeMu", fullname: "Almeda Mudge", email: "almemu@smth.c", telephone: "+369910025", password: yield Hash.make("pw") },
        { username: "FlavMa", fullname: "Flavia Matsuo", email: "flavma@smth.c", telephone: "+369910026", password: yield Hash.make("pw") },
        { username: "SandEn", fullname: "Sandi Engelking", email: "sanden@smth.c", telephone: "+369910027", password: yield Hash.make("pw") },
        { username: "RickGr", fullname: "Ricky Grindle", email: "rickgr@smth.c", telephone: "+369910028", password: yield Hash.make("pw") },
        { username: "GenaKe", fullname: "Genaro Keeble", email: "genake@smth.c", telephone: "+369910029", password: yield Hash.make("pw") },
        { username: "BretKu", fullname: "Bret Kull", email: "bretku@smth.c", telephone: "+369910030", password: yield Hash.make("pw") }
      ]);
  }

}

module.exports = EmployeeSeeder
