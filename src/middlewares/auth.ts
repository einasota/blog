import { Request, Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    id: string,
    iat: number,
    exp: number
}

export function AuthMiddleware(request:Request, response:Response, next:NextFunction) {
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