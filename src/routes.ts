import { Router } from "express";

export const routes = Router()

routes.get("/", (request, response) => {
    response.send("Server Running!!")
})