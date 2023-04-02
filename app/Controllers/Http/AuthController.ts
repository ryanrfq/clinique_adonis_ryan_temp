import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient'
import User from 'App/Models/User'
import ChangePasswordUserValidator from 'App/Validators/ChangePasswordUserValidator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import { UserRole } from 'Contracts/enums'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateUserValidator)

        const data = await User.create(payload)

        response.created({
            message: "User registered successfully",
            data
        })
    }

    public async patientRegister({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(CreateUserValidator)

        const registrar = await User.query()
            .where('id', auth.user!.id)
            .preload('employee')
            .firstOrFail()

        const userData = await User.create({
            ...payload,
            role: UserRole.PATIENT
        })

        // hanya isi registrar dan id user dari si pasien
        // sisanya si pasien yg mengisi
        const patientData = await Patient.create({
            registBy: registrar.employee.id,
            userId: userData.id,
        })

        await Mail.sendLater((message) => {
            message
                // todo: setelah berhasil kirim lewat gmail..
                // ubah value .from dengan real value, 
                // cek apakah tetap terkirim
                .from('info@example.com')
                .to(userData.email)
                .subject('Verifikasi Akun Anda')
                .htmlView('emails/patient/welcome', {
                    email: userData.email,
                    action_url: `http://localhost:3333/verify-patient`,
                    token: userData.token
                })
        })

        response.created({
            message: "Berhasil meregistrasi pasien baru",
            userData,
            patientData
        })
    }

    public async changePassword({ request, response }: HttpContextContract) {
        const payload = await request.validate(ChangePasswordUserValidator)

        // todo (optional): coba validasi dengan cek password lama
        // await auth.use('api').verifyCredentials(email, password)
        // const checkPassword = User.query()

        const data = await User.findOrFail(payload.id)
        await data.merge({ password: payload.password_new }).save()

        response.created({
            message: "User password changed successfully",
            data
        })
    }

    public async login({ request, response, auth }: HttpContextContract) {
        const { email, password } = await request.validate(LoginUserValidator)

        try {
            const token = await auth.use('api').attempt(email, password)
            return token
        } catch (error) {
            return response.unauthorized({ message: "Invalid credentials" })
        }
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.use('api').logout()

        response.ok({
            message: "berhasil logout"
        })
    }
}
