import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=>{
    console.log(`app listen on port localhost:${PORT}`)
})