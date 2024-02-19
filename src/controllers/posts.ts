import { Request, Response } from "express";
import { prisma } from "../database/prisma"
import { z } from "zod"

export class PostsController {
    async list(request: Request, response: Response) {
        const posts = await prisma.post.findMany({
            take: -100
        })
        return response.status(200).send(posts)
    }
    async listUnique(request: Request, response: Response) {
        const { id } = request.params
        const post = prisma.post.findUnique({
            where: { id }
        })
        if (!post) {
            return response.status(404).send({ message: "Post not found" })
        }
        return response.status(200).send(post)
    }
    async create(request: Request, response: Response) {
        const newPost = z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
            userId: z.string()
        })
        const { title, description, content } = newPost.parse(request.body)
        const { userId } = newPost.parse(request.userId)
        await prisma.post.create({
            data: {
                title,
                description,
                content,
                userId
            }
        })
        return response.status(201).send()
    }
    async edit(request: Request, response: Response) {
        const editPost = z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
        })
        const { title, description, content } = editPost.parse(request.body)
        const { id } = request.params
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        if(!post){
            return response.status(404).send({message: "post not found"})
        }
        await prisma.post.update({
            where: { id },
            data: {
                title: !title ? post?.title : title,
                description: !description ? post?.description : description,
                content: !content ? post?.content : content
            }
        })
        return response.status(202).send()

    }
    async delete(request: Request, response: Response) {
        const { id } = request.params
        await prisma.post.delete({
            where: { id }
        })
        return response.status(204).send()
    }
}