import { Request, Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

type TokenPayload = {
    id: string,
    iat: number,
    exp: number
}

export function AuthMiddlewareUser(request:Request, response:Response, next:NextFunction) {
    const {authorization} = request.headers
    if(!authorization){
        return response.status(401).send({message: "Token not provided"})
    }
    const[, token] = authorization.split(" ")
    try {
        const decode = verify(token, String(process.env.SECRET))
        console.log()
        const {id} = decode as TokenPayload
        request.userId = id
        next()
    } catch (error) {
        return response.status(401).send({message: "Token invalid"})
    }
}

export async function AuthMiddlewareAdmin (request:Request, response:Response, next:NextFunction) {
    const {authorization} = request.headers
    if(!authorization){
        return response.status(401).send({message: "Token not provided"})
    }
    const[, token] = authorization.split(" ")
    try {
        const decode = verify(token, String(process.env.SECRET))
        console.log()
        const {id} = decode as TokenPayload
        const userRole = await prisma.user.findUnique({where: {id}, select: {role:true}})
        if(userRole!.role !== 'admin') {
            console.log(userRole)
            return response.status(401).send({message: "unauthorized user"})
        } else {
            request.userId = id
            next()
        }
    } catch (error) {
        return response.status(401).send({message: "Token invalid"})
    }
}