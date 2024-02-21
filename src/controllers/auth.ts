import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"
import "dotenv/config"

export class AuthController {
    async login (request:Request, response:Response) {
        const login = z.object({
            email: z.string().email(),
            password: z.string()
        })
        const {email, password} = login.parse(request.body)
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user) {
            return response.status(404).send({message: "User not found"})
        }
        const isValuePass = await compare(password, user.password)
        if(!isValuePass) {
            return response.status(404).send({message: "Password invalid"})
        }
        const token = sign({id:user.id}, String(process.env.SECRET), {expiresIn: "1d"})
        const {id} = user
        return response.status(200).send({user:{id, email}, token})
    }
}