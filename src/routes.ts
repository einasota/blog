import { Router } from "express";
import { PostsController } from "./controllers/posts";
import { UserController } from "./controllers/users";


export const routes = Router()


const posts = new PostsController()
const users = new UserController()

//POSTS routes
routes.get('/posts', posts.list)
routes.get('/posts/:id', posts.listUnique)
routes.post('/posts', posts.create)
routes.put('/posts/:id', posts.edit)
routes.delete('/posts/:id', posts.delete)

//USERS routes
routes.get('/users', users.list)
routes.get('/users/:id', users.listUnique)
routes.post('/users', users.create)
routes.put('/users/:id', users.edit)
routes.delete('/users/:id', users.delete)
