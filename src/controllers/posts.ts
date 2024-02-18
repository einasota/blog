import { Request, Response } from "express";
import {prisma} from "../database/prisma"
import {z} from "zod"

export class PostsController {
    async create (request:Request, response:Response) {
        const newPost = z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
            userId: z.string()
        })
        const {title, description, content} = newPost.parse(request.body)
        const {userId} = newPost.parse(request.userId)
        await prisma.post.create({
            data: {
                title,
                description,
                content,
                userId
            }
        })
    }
    async delete (request:Request, response:Response) {
        const {id} = request.params
        await prisma.post.delete({
            where: {id}
        })
    }
}