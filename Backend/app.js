import express from 'express'
import cookieParser from 'cookie-parser'     
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
dotenv.config() 
const app=express()




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.get("/home",(req,res)=>{
    res.send("hello")
})




const PORT=process.env.PORT||5000

app.use("/api/v1/user",userRoute  )



app.listen(PORT,()=>{
    connectDB();
    console.log(`Backend server is running ${PORT }`)
})

