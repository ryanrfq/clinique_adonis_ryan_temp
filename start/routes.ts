import Route from "@ioc:Adonis/Core/Route";
import { Role } from "Contracts/enums";

Route.group(() => {
    Route.resource("/employees", "EmployeesController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.resource("/doctors", "DoctorsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.resource("/pharmacists", "PharmacistsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,pharmacy',
            'update': 'checkRole:admin,pharmacy',
            'destroy': 'checkRole:admin',
        })
    Route.resource("/patients", "PatientsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.shallowResource("patients.medical-records", "MedicalRecordsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.resource("/clinics", "ClinicsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.shallowResource("clinics.clinic-queues", "ClinicQueuesController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.resource("/registration-queues", "RegistrationQueuesController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.resource("/transactions", "TransactionsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })
    Route.shallowResource("transaction.transaction-details", "TransactionDetailsController").apiOnly()
        .middleware({
            'index': `checkRole:${Object.values(Role)}`,
            'show': `checkRole:${Object.values(Role)}`,
            'store': 'checkRole:admin,doctor',
            'update': 'checkRole:admin,doctor',
            'destroy': 'checkRole:admin',
        })

    Route.post('/change-password', 'AuthController.changePassword').middleware('checkRole:admin')
    Route.post('/logout', 'AuthController.logout').middleware('checkRole:admin,doctor,pharmacy')
}).middleware(['auth'])

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')