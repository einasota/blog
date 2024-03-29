import Express from "express"
import cors from "cors"
import 'dotenv/config'
import { routes } from "./routes"

const app = Express()

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended: false}))
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log("HTTP Server Running!")
})