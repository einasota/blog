import { Request, Response } from "express";
import { prisma } from "../lib/prisma"
import { z } from "zod"

export class PostController {
    async create(request: Request, response: Response) {
        const postData = z.object({
            title: z.string().min(6),
            shortDescription: z.string(),
            content: z.object({})
        })
        const { title, shortDescription, content } = postData.parse(request.body)
        try {
            if (!title && !content) {
                return response.status(400).send({ error: "insert text in title and content" })
            }
            await prisma.post.create({
                data: {
                    title,
                    shortDescription,
                    content
                    //Falta adicionar o autor, realizar busca salvo após o login!
                }
            })
            return response.status(201).send({ message: "post created successful" })
        } catch (error) {
            return response.status(400).send({ error: error })
        }
    }
}