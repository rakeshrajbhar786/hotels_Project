// const jsonString='{"name":"Rakesh","age":23,"city":"Delhi"}';
// const jsonObject=JSON.parse(jsonString);
// console.log(jsonObject);
// console.log(typeof jsonObject);

// const objectToConvert={
//     name:"Alice",
//     age:22
// };
// const jsonStr=JSON.stringify(objectToConvert);
// console.log(jsonStr);
// console.log(typeof jsonStr);

// Creating a new Server ->using expressJs
// import express from 'express' //first install expressJs in curDirectory
const express=require('express');
const app = express();// this contains blueprint for developing server.
                      // and contains various functionalities. 
const db=require('./db'); 
const passport=require('./auth');


require('dotenv').config();
const PORT=process.env.PORT||3000;  


// ExpressJS Middleware : body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store in req.body

const { constant } = require('lodash');

// Middleware  function define
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); // Move onto next phase
}

app.use(logRequest);

app.use(passport.initialize());

// const localAuthMiddleware=passport.authenticate('local',{session:false});

// Define localAuthMiddleware for readability
const localAuthMiddleware = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ message: info ? info.message : 'Unauthorized' });
        }
        req.user = user; // Attach user to request if needed
        next();
    })(req, res, next);
};

app.get('/',function (req, res){
    res.send('Hello Sir, how may I help you with..?');
});

// app.get('/', (req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err) return next(err);
//         if (!user) {
//             // info.message contains your custom message
//             return res.status(401).json({ message: info ? info.message : 'Unauthorized' });
//         }
//         // Authenticated
//         res.send('Hello Sir, how may I help you with..?');
//     })(req, res, next);
// });



app.get('/chicken',(req,res)=>{
    res.send('I would love to serve your order.');
});
app.get('/idli',(req,res)=>{
    var customised_Idli={
        name:'rava idli',
        size:'10cm in diameter',
        is_sambhar:true,
        is_chutney:false
    }
    res.send(customised_Idli);
});
app.post('/Items',(req,res)=>{
    res.send("Items data is saved.");
})
app.get('/dal',(req,res)=>{
    res.send('Enjoy your widely traditional meals.');
}); 

// Import router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

// Use the routes
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',menuRoutes);

// 3000->port no. specifying that server made at this port.
app.listen(PORT,()=>{
    console.log('Server is running and listening to port 3000');
}) 