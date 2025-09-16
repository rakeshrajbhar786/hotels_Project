// This db.js file used to build the database connections with NodeJS
const mongoose=require('mongoose');
require('dotenv').config();
//1. define mongodb connection URL

// const mongoURL=process.env.LOCAL_MONGODB
const mongoURL=process.env.MONGODB_URL

//2. setup mongodb connections  
mongoose.connect(mongoURL)

// Get a default connection
// Mongoose maintains default connection object reprsenting MongoDB connection.
const db=mongoose.connection;

//Define event listener
db.on('connected',()=>{
    console.log('Connected to mongoDB server');
})
db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
})
db.on('disconnected',()=>{
    console.log('MongoDB is disconnected');
})

//Export database connection 
module.exports=db;