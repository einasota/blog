import { Router } from "express";
import { AuthController } from "./controllers/AuthController";

export const routes = Router()

const user = new AuthController()

routes.get("/", (request, response) => {
    response.send("Server Running!!")
})

routes.post("/register", user.register)
routes.post("/login", user.login)