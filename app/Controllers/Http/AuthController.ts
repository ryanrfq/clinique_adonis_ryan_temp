import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        const payload = request.body()

        const data = await User.create(payload)
        // TODO: buat validasi
        // - request body harus berisi:
        //   > employee_id
        //   > email
        //   > password

        response.created({
            message: "User registered successfully",
            data
        })
    }

    public async changePassword({ request, response }: HttpContextContract) {
        const { id, password_new } = request.body()

        // TODO: buat validasi
        // - request body harus berisi:
        //   > employee_id
        //   > password_lama
        //   > password_baru

        const data = await User.findOrFail(id)
        await data.merge({ password: password_new }).save()

        response.created({
            message: "User password changed successfully",
            data
        })
    }

    public async login({ request, response, auth }: HttpContextContract) {
        const { email, password } = request.body()

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
