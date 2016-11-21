'use strict'

const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {

  * run() {
    const id = yield Database
      .table('employees')
      .insert([
        { username: "MathGa", fullname: "Mathilde Gagliardi", gender: 2, email: "mathga@smth.c", telephone: "+369910021", password: "pw" },
        { username: "DeidGe", fullname: "Deidra Geter", gender: 2, email: "deidge@smth.c", telephone: "+369910022", password: "pw" },
        { username: "GastHa", fullname: "Gaston Hanus", gender: 1, email: "gastha@smth.c", telephone: "+369910023", password: "pw" },
        { username: "JiPe", fullname: "Ji Peterman", gender: 2, email: "jipe@smth.c", telephone: "+369910024", password: "pw" },
        { username: "AlmeMu", fullname: "Almeda Mudge", gender: 2, email: "almemu@smth.c", telephone: "+369910025", password: "pw" },
        { username: "FlavMa", fullname: "Flavia Matsuo", gender: 2, email: "flavma@smth.c", telephone: "+369910026", password: "pw" },
        { username: "SandEn", fullname: "Sandi Engelking", gender: 2, email: "sanden@smth.c", telephone: "+369910027", password: "pw" },
        { username: "RickGr", fullname: "Ricky Grindle", gender: 1, email: "rickgr@smth.c", telephone: "+369910028", password: "pw" },
        { username: "GenaKe", fullname: "Genaro Keeble", gender: 1, email: "genake@smth.c", telephone: "+369910029", password: "pw" },
        { username: "BretKu", fullname: "Bret Kull", gender: 1, email: "bretku@smth.c", telephone: "+369910030", password: "pw" }
      ]);
  }

}

module.exports = UserSeeder
