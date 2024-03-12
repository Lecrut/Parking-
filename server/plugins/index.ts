import mongoose from "mongoose";
import { Nitro } from "nitroPack"

export default async (nitroApp: Nitro) => {
    const config = useRuntimeConfig()
        
    mongoose
        .connect(config.mongoUri)
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err))
}
