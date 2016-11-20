'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

// Route.on('/').render('index')
//http://www.adonisjs.com/docs/3.1/routing
/*
Route.get('/user/:id', function * (request, response) {
  const id = request.param('id')
  response.send(`Profile for user with id ${id}`)
})
*/
Route.get('/list/:name', 'SzNyController.list')
Route.get('/new/:name', 'XYZController.showNewForm')
Route.post('/new/:name', 'XYZController.saveNew')

Route.get('/login', 'AuthController.showLoginForm')
Route.get('/logout', 'AuthController.logout')
Route.post('/login', 'AuthController.handleLogin')

Route.on('/about').render('about')

Route.get('/', 'MovieController.index')
/*Route.get('/new', 'MovieController.showNewForm')
Route.post('/new', 'MovieController.saveNew')*/

Route.get('/protected', 'ProtectedController.index').middleware('auth')
