import { Request, Response } from "express";
import { prisma } from "../database/prisma"
import { hash } from "bcrypt"
import { z } from "zod"

export class UserController {
    async list(request: Request, response: Response) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true
            }
        })
        return response.status(200).send(users)
    }
    async listUnique(request: Request, response: Response) {
        const { id } = request.params
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true
            }
        })
        if (!user) {
            return response.status(404).send({ message: "user not found" })
        }
        return response.status(200).send(user)
    }
    async create(request: Request, response: Response) {
        const newUser = z.object({
            name: z.string(),
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })
        const { name, username, email, password } = newUser.parse(request.body)
        const hash_password = await hash(password, 10)
        await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hash_password,
                role: 'user'
            }
        })
        return response.status(201).send()
    }
    async edit(request: Request, response: Response) {
        const editUser = z.object({
            name: z.string(),
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })
        const { name, username, email, password } = editUser.parse(request.body)
        const { id } = request.params
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            return response.status(404).send({ message: "User not found" })
        }
        const hash_password = await hash(password, 10)
        await prisma.user.update({
            where: { id },
            data: {
                name: !name ? user.name : name,
                username: !username ? user.username : username,
                email: !email ? user.email : email,
                password: !password ? user.password : hash_password
            }
        })
        return response.status(200).send()
    }
    async delete(request: Request, response: Response) {
        const { id } = request.params
        await prisma.user.delete({ where: { id } })
    }
}