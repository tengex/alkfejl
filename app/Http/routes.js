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
Route.get('/list/:name/:filter?', 'ListController.list')
Route.get('/new/:name', 'CreateNewController.createNew')
Route.post('/new/:name', 'CreateNewController.createNewSubmit')
Route.get('/edit/:name/:id', 'EditController.edit')
Route.post('/edit/:name/:id', 'EditController.editSubmit')
Route.get('/inactivate/:name/:id', 'ActivateController.inactivate')
Route.get('/activate/:name/:id', 'ActivateController.activate')

Route.get('/dev/', 'SzNyController.dev')

Route.get('/login', 'AuthController.login')
Route.post('/login', 'AuthController.loginSubmit')
Route.get('/logout', 'AuthController.logout')

Route.on('/about').render('about')

Route.get('/', 'MovieController.index')
/*Route.get('/new', 'MovieController.showNewForm')
Route.post('/new', 'MovieController.saveNew')*/

Route.get('/protected', 'ProtectedController.index').middleware('auth')
