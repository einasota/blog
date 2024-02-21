import { Router } from "express";
import { PostsController } from "./controllers/posts";
import { UserController } from "./controllers/users";
import { AuthController } from "./controllers/auth";
import { AuthMiddleware } from "./middlewares/auth";


export const routes = Router()


const posts = new PostsController()
const users = new UserController()
const auth = new AuthController()
//POSTS routes
routes.get('/posts', posts.list)
routes.get('/posts/:id', AuthMiddleware, posts.listUnique)
routes.post('/posts', AuthMiddleware, posts.create)
routes.put('/posts/:id', AuthMiddleware, posts.edit)
routes.delete('/posts/:id', AuthMiddleware, posts.delete)

//USERS routes
routes.get('/users', AuthMiddleware, users.list)
routes.get('/users/:id', AuthMiddleware,users.listUnique)
routes.post('/users', users.create)
routes.put('/users/:id', AuthMiddleware, users.edit)
routes.delete('/users/:id', AuthMiddleware, users.delete)

//Auth routes
routes.post('/login', auth.login)
