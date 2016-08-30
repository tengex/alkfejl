npm i -g adonis-cli
adonis new myapp
.env fájlban kikommentelni a HOST és PORT bejegyzéseket
`./ace` nem működik, helyett `node --harmony_proxies ace`

Route-ok: app/http/routes.js
make:view index -e
make:controller Movie

Adatbázis készítése: migrations
ace make:migration movies --create=movies
npm i --save sqlite3 
.env beállítása (jó, ahogy van)
ace migration:run

Dummy adatok felvitele: Database factory and seeds
Factory: database/factory.js
Factoryhoz modell létrehozása szükséges (`ace make:model Movie`)
Ne legyen a mező neve `length`
ace make:seed Movie --> seed file
ace db:seed

Controllerben lekérdezés
use('Database') és query builder
const movies = yield Database.from('movies').select('*');
vagy:
use('App/Model/Movie') és Lucid Active Record
const movies = yield Movie.all();
movies.toJSON()
view kiegészítése


ManyToMany relationship: migrations and models
Migrations
`ace make:migration actors --create=actors`
`ace make:migration movie_actor --create=movie_actor`
ace migration:refresh
ügyelni kell, hogy az id-k és foreign key oszlopok típusai megegyezzenek! unsigned, 11
a pivot tábla abc sorrendben legyen
Seeds
yield create
make
yield each


Űrlapkezelés
Routes
Megjelenítés
indicative projekt a validator


C9: sqlite vagy postgresql
webes interface: express-admin, ld dbadmin mappa
Alap alkalmazás: 8080
Másik: 8081

Http Listenerben az InvalidLoginException-t

User modell
`ace make:hook User --method=encryptPassword`
Hash-t használni benne



