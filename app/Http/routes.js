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
Route.get('/', 'MovieController.index')
Route.get('/new', 'MovieController.showNewForm')
Route.post('/new', 'MovieController.saveNew')
Route.get('/login', 'AuthController.showLoginForm')
Route.get('/logout', 'AuthController.logout')
Route.post('/login', 'AuthController.handleLogin')
Route.get('/protected', 'ProtectedController.index').middleware('auth')
