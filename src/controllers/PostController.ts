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

        } catch (error) {

        }
    }
}