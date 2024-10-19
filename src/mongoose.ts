"use server"
import mongoose from 'mongoose'

let isConnected:boolean=false;

export const connectDB=async()=>{
    mongoose.set('strictQuery',true)
    if(!process.env.MONGODB_URL) return console.log("MISSING URL")

    if(isConnected) return console.log("DB Already Connected")

    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'LinkShare'
        })
        isConnected=true;
        console.log("Db Connected")
    }
    catch(err){
        console.log(err)
    }

}
