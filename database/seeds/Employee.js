'use strict'

const Hash = use('Hash')
const Factory = use('Factory')
const Database = use('Database')

class EmployeeSeeder {

  * run() {
    const id = yield Database
      .table('employees')
      .insert([
        { username: "MathGa", fullname: "Mathilde Gagliardi", gender: 2, email: "mathga@smth.c", telephone: "+369910021", password: yield Hash.make("pw") },
        { username: "DeidGe", fullname: "Deidra Geter", gender: 2, email: "deidge@smth.c", telephone: "+369910022", password: yield Hash.make("pw") },
        { username: "GastHa", fullname: "Gaston Hanus", gender: 1, email: "gastha@smth.c", telephone: "+369910023", password: yield Hash.make("pw") },
        { username: "JiPe", fullname: "Ji Peterman", gender: 2, email: "jipe@smth.c", telephone: "+369910024", password: yield Hash.make("pw") },
        { username: "AlmeMu", fullname: "Almeda Mudge", gender: 2, email: "almemu@smth.c", telephone: "+369910025", password: yield Hash.make("pw") },
        { username: "FlavMa", fullname: "Flavia Matsuo", gender: 2, email: "flavma@smth.c", telephone: "+369910026", password: yield Hash.make("pw") },
        { username: "SandEn", fullname: "Sandi Engelking", gender: 2, email: "sanden@smth.c", telephone: "+369910027", password: yield Hash.make("pw") },
        { username: "RickGr", fullname: "Ricky Grindle", gender: 1, email: "rickgr@smth.c", telephone: "+369910028", password: yield Hash.make("pw") },
        { username: "GenaKe", fullname: "Genaro Keeble", gender: 1, email: "genake@smth.c", telephone: "+369910029", password: yield Hash.make("pw") },
        { username: "BretKu", fullname: "Bret Kull", gender: 1, email: "bretku@smth.c", telephone: "+369910030", password: yield Hash.make("pw") }
      ]);
  }

}

module.exports = EmployeeSeeder
