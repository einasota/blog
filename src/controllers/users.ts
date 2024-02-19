import { Request, Response } from "express";
import { prisma } from "../database/prisma"
import { z } from "zod"

export class UserController {
    async list (request:Request, response:Response) {
        const users = prisma.user.findMany()
        return response.status(200).send(users)
    }
    async listUnique (request:Request, response:Response) {
        const {id} = request.params
        const user = prisma.user.findUnique({
            where: {
                id
            }
        })
        if(!user) {
            return response.status(404).send({message: "user not found"})
        }
        return response.status(200).send(user)
    }
    async create (request:Request, response:Response) {
        const newUser = z.object({
            name: z.string(),
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })
        const {name, username, email, password} = newUser.parse(request.body)
        await prisma.user.create({
            data: {
                name,
                username,
                email,
                password
            }
        })
    }
    async edit (request:Request, response:Response) {
        const editUser = z.object({
            name: z.string(),
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })
        const {name, username, email, password} = editUser.parse(request.body)
        const { id } = request.params
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user) {
            return response.status(404).send({message: "User not found"})
        }
        await prisma.user.update({
            where: {id},
            data: {
                name: !name ? user.name : name,
                username: !username ? user.username : username,
                email: !email ? user.email : email,
                password: !password ? user.password : password
            }
        })
        return response.status(200).send()
    }
    async delete (request:Request, response:Response) {
        const {id} = request.params
        await prisma.user.delete({where: {id}})
    }
}