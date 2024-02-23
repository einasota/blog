import { Router } from "express";
import { PostsController } from "./controllers/posts";
import { UserController } from "./controllers/users";
import { AuthController } from "./controllers/auth";
import { AuthMiddlewareAdmin, AuthMiddlewareUser } from "./middlewares/auth";


export const routes = Router()


const posts = new PostsController()
const users = new UserController()
const auth = new AuthController()
//POSTS routes
routes.get('/posts', posts.list)
routes.get('/posts/:id', AuthMiddlewareUser, posts.listUnique)
routes.post('/posts', AuthMiddlewareAdmin, posts.create)
routes.put('/posts/:id', AuthMiddlewareAdmin, posts.edit)
routes.delete('/posts/:id', AuthMiddlewareAdmin, posts.delete)

//USERS routes
routes.get('/users', AuthMiddlewareAdmin, users.list)
routes.get('/users/:id', AuthMiddlewareUser,users.listUnique)
routes.post('/users', users.create)
routes.put('/users/:id', AuthMiddlewareUser, users.edit)
routes.delete('/users/:id', AuthMiddlewareUser, users.delete)

//Auth routes
routes.post('/login', auth.login)
