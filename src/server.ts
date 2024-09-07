import express from "express";
import { router as bookRouter } from './router/book';
import { router as userRouter } from './router/user';
import { router as loanRouter } from './router/loan';
import { conectarDB } from "./config/db";
import dotenv from 'dotenv'
import cors, { CorsOptions } from "cors";

dotenv.config()

conectarDB()

// Instancia de express
export const server = express()

// Permitir Conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        // console.log(origin);
        if (origin == process.env.LOCAL_URL) {
           callback(null, true)
        } else {
           callback(new Error('Error de CORS'))
        }
    },
    optionsSuccessStatus: 200
}
server.use(cors(corsOptions))

// Leer datos del formulario (AQUI)
server.use(express.json())

// Routing
server.use('/api/books', bookRouter);
server.use('/api/users', userRouter);
server.use('/api/loans', loanRouter);