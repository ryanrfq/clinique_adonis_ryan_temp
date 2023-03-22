/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource('/employees', 'EmployeesController').apiOnly()
Route.resource('/doctors', 'DoctorsController').apiOnly()
Route.resource('/clinics', 'ClinicsController').apiOnly()
Route.resource('/pharmacists', 'PharmacistsController').apiOnly()
Route.resource('/patients', 'PatientsController').apiOnly()
Route.resource('/registration_queues', 'RegistrationQueuesController').apiOnly()
Route.resource('/clinic_queues', 'ClinicQueuesController').apiOnly()
Route.resource('/medical_records', 'MedicalRecordsController').apiOnly()
Route.resource('/transactions', 'TransactionsController').apiOnly()
Route.resource('/transaction_details', 'TransactionDetailsController').apiOnly()