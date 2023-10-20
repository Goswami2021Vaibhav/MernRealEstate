import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log('connected to mondodb')
}).catch(() => {
    console.log('not connected to mondodb')
});

const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message
    })
})