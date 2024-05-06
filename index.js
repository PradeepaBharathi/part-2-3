import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { AppRouter } from './routes/appRoute.js'


dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use("/app",AppRouter)
app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log("app is listening to port 9000")
})