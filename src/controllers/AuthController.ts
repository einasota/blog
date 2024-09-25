import { Request, Response } from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { authLib } from "../lib/auth"
import { prisma } from "../lib/prisma"
import z from "zod"

export class AuthController {
    async register(request: Request, response: Response) {
        const userData = z.object({
            name: z.string(),
            email: z.string().email(),
            pass: z.string().min(8),
            role: z.string().nullable()
        })
        const { name, email, pass, role } = userData.parse(request.body)
        try {
            if (await prisma.user.findUnique({ where: { email } })) {
                return response.status(400).send({ error: "user already exists" })
            }
            const hashPass = await bcryptjs.hash(pass, 10)
            await prisma.user.create({
                data: {
                    name,
                    email,
                    pass: hashPass,
                    role: role ? role : "user" //Se a role for undefined ele era definir o valor padrão para user!
                }
            })
            return response.status(201).send({ message: "create user successfully" })
        } catch (error) {
            return response.status(400).send({ error: error })
        }
    }
    async login(request: Request, response: Response) {
        const userData = z.object({
            email: z.string().email(),
            pass: z.string()
        })
        const { email, pass } = userData.parse(request.body)
        try {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) {
                return response.status(400).send({ error: "user not found" })
            }
            if (!await bcryptjs.compare(pass, user.pass)) {
                return response.status(400).send({ error: "password invalid" })
            }
            const token = jwt.sign({ id: user.id }, authLib.secret!, {
                expiresIn: authLib.expiresIn
            })

            return response.status(200).send({ data: { name: user.name, email: user.email, token: token } })
        } catch (error) {

        }
    }
}