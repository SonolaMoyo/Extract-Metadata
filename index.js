import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./config/db"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=>{
    connectDatabase();
    console.log(`app listen on port localhost:${PORT}`)
})