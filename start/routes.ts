import Route from "@ioc:Adonis/Core/Route";
import { EmployeeRole, UserRole } from "Contracts/enums";

// todo: testing akses pasien, sebelum dan sesudah verif
// todo: cek lagi image upload
Route.group(() => {
    Route.resource("/employees", "EmployeesController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.post("/employees/:id/image-upload", "EmployeesController.imageUpload")
        .middleware(`checkUserRole:${UserRole.EMPLOYEE}`)
        .middleware(`checkEmployeeRole:${Object.values(EmployeeRole)}`)

    Route.resource("/doctors", "DoctorsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.post("/doctors/:id/image-upload", "DoctorsController.imageUpload")
        .middleware(`checkUserRole:${UserRole.EMPLOYEE}`)
        .middleware('checkEmployeeRole:admin,doctor')

    Route.resource("/pharmacists", "PharmacistsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,pharmacy',
            'update': 'checkEmployeeRole:admin,pharmacy',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.resource("/patients", "PatientsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.get("/patient/index", "PatientsController.showLoggedIn")
        .middleware([`checkUserRole:${UserRole.PATIENT}`, 'checkIsVerified'])

    Route.post("/patients/request-verification", "PatientsController.requestNewVerification").middleware('checkUserRole:patient')

    Route.post("/patients/:id/image-upload", "PatientsController.imageUpload")
        .middleware([`checkUserRole:${Object.values(UserRole)}`, 'checkIsVerified'])

    Route.shallowResource("patients.medical-records", "MedicalRecordsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.get("/patient/medical-records", "MedicalRecordsController.showLoggedIn")
        .middleware([`checkUserRole:${UserRole.PATIENT}`, 'checkIsVerified'])

    Route.resource("/clinics", "ClinicsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.shallowResource("clinics.clinic-queues", "ClinicQueuesController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.resource("/registration-queues", "RegistrationQueuesController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.resource("/transactions", "TransactionsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.shallowResource("transaction.transaction-details", "TransactionDetailsController").apiOnly()
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'show': `checkEmployeeRole:${Object.values(EmployeeRole)}`,
            'store': 'checkEmployeeRole:admin,doctor',
            'update': 'checkEmployeeRole:admin,doctor',
            'destroy': 'checkEmployeeRole:admin',
        })

    Route.resource("/users", "UsersController").only(['index', 'store'])
        .middleware({ '*': `checkUserRole:${UserRole.EMPLOYEE}` })
        .middleware({
            'index': `checkEmployeeRole:${EmployeeRole.ADMIN}`,
            'store': `checkEmployeeRole:${EmployeeRole.ADMIN}`
        })

    Route.post('/patient-register', 'AuthController.patientRegister')
        .middleware('checkUserRole:employee')
        .middleware('checkEmployeeRole:admin')

    Route.post('/change-password', 'AuthController.changePassword')

    Route.post('/logout', 'AuthController.logout').middleware(`checkUserRole:${Object.values(UserRole)}`)

    Route.post('/register-employee', 'AuthController.registerEmployee')
        .middleware(`checkUserRole:${UserRole.EMPLOYEE}`)
        .middleware('checkEmployeeRole:admin')

}).middleware(['auth'])

// TODO: buat grup baru yg harus sudah login dan verified
// pseudo
// Route.group(() => {
// isi routenya (bisa pindahan dari grup atas)
// }).middleware(['auth', 'isVerified'])

Route.post('/login', 'AuthController.login')
Route.post("/verify-patient", "PatientsController.verifyToken")

/*
    =================================
    Testing Area
    =================================
*/
// Route.get('/', ({ view }) => {
    // const html = view.render('dashboard', { name: 'John Doe' })
    // return html
//     return DateTime.now().setZone('UTC+7')//.plus({ hours: 4 })
// })

// Route.get('/random-string', (() => {
//     return MyHelper.generateToken(15)
// }))