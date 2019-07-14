'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/companies', 'App/Domain/Commands/Company/get.execute')
  Route.post('/companies', 'App/Domain/Commands/Company/create.execute')
  Route.post('/places', 'App/Domain/Commands/CompanyPlace/create.execute')
  Route.get('/places/search', 'App/Domain/Commands/CompanyPlace/search.execute')
}).prefix('api')
