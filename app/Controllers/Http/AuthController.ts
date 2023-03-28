import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ChangePasswordUserValidator from 'App/Validators/ChangePasswordUserValidator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateUserValidator)

        const data = await User.create(payload)

        response.created({
            message: "User registered successfully",
            data
        })
    }

    public async changePassword({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(ChangePasswordUserValidator)

        // coba validasi dengan cek password lama apakah sesuai...
        // ...baru update dengan password baru
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
