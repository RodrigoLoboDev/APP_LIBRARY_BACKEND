import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"

dotenv.config()

const db = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})

export async function conectarDB () {
    try {
        await db.authenticate()
        db.sync() // Para sincronizar en automatico los modelos y acciones que vallamos agregando con nuestra DB
        console.log('Conexión exitosa a la DB');
    } catch (error) {
        console.log(`Hubo un error en la conexión con la DB: ${error}`);   
    }
}