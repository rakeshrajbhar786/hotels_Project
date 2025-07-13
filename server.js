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

// ExpressJS Middleware : body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store in req.body

      

const { constant } = require('lodash');

app.get('/', (req, res) => {
  res.send('Hello Sir, how may I help you with..?');
});



/*app.get('/chicken',(req,res)=>{
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
}); */

// Import router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');
app.use('/person',personRoutes);

app.use('/menu',menuRoutes);

// 3000->port no. specifying that server made at this port.
app.listen(3000,()=>{
    console.log('Server is running and listening to port 3000');
}) 