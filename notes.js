// Nodemon close in Cmd-> CTRL+C
console.log("Notes page has loaded.");
console.log(`V8 version: ${process.versions.v8}`);
var name='Arjun';console.log(name);

// const addNum=function(a,b){
//     return a+b;
// }

// module.exports={
//     name,
//     addNum
// }
// console.log("Server file is running..!");

// 1. npm init: it is always used before beginning our project. Gives package.json file
// 2. ExpressJs is installed -> helps to build own server in JS.Gives package-lock.json file
/* NPM nodemon package
   it is used to track the changes made in server.js file, then accepts it and run the file.
*/ 
// function add(a,b){
//     return a+b;
// }

// const { name } = require("./notes");

// var add=function(a,b){
//     return a+b;
// }

// var add=(a,b)=>{return a+b}

/*var add=(a,b)=>a+b

var res=add(6,4);
console.log("res:"+res); */

// Function that gets run as soon as it is created without by call.
/*(function(){
    console.log("Rakesh is Learning..!");
})();*/

// CallBack Function: 
// it's function used to run the callback func task as soon as 
// main func is completed.
/*function callback(){
    console.log("Main task completed and called callback func task.");
}
const add=function(a,b,callback){
    const res=a+b;
    console.log("res:"+res);
    callback();
}
add(4,6,callback);*/

/*const add=function(a,b,newFun){
    const res=a+b;
    console.log("res:"+res);
    newFun();
}
// add(100,55,function(){
//     console.log("add completed and callback func is called.");
// });

add(45,50,()=>console.log("Called newFun task."));*/

// NodeJs package APIs
// 1. File System  2. OS
// var fs=require('fs');
// var os=require('os');
// var  user=os.userInfo();
// var dir=os.homedir();
// console.log(fs);
// console.log(user);
// console.log(dir);
// fs.appendFile('greeting.txt','Hii '+user.username+'!\n',()=>{
//     console.log("Called Cb");
// });
// var ver=os.version();
// console.log("OS version:"+ver);
// var sys=os.machine();
// console.log("OS machine:"+sys); 

//Server File can associates many other file and helps to run .

/*var notes=require('./notes.js');
console.log("Server Page is Running.");
const name=notes.name;
const res=notes.addNum(91,5);
console.log(name)
console.log("res of addition:"+res); */

// Lodash api
// var _ = require('lodash');
// var arr=['person','person',1,2,1,2,'2',"place"];
// console.log(arr);
// var filter=_.uniq(arr);
// console.log(filter);
// console.log(_.isString("Raj"));
// console.log(_.lastIndexOf(arr,2,6));
// const ch=_.trimStart("Raj Rohan is Good.",'R');
// const ch=_.trimEnd("Raj Rohan is Good.",'Good.');
// console.log(ch); 
