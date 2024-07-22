import mongoose from 'mongoose'
import express from "express";

// const mongoose  = require ('mongoose')
// const colors = require ('colors') 



const dbConnection = async() =>{
    try {
        let conn = await mongoose.connect('mongodb://127.0.0.1:27017/usersData')
        console.log(`Datebase Connected Successfully ${conn.connection.host}`.bgWhite )
    } catch (error) {
        console.log(error)
        console.log(`Error in DB Connection` .bgRed)
    }
}
export default dbConnection;



// http://127.0.0.1:27017:7100/register