const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const { isMatch } = require('lodash');


//define person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["Chef","Waiter","Manager"],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//Using mongoose pre middleware
personSchema.pre('save', async function(next){
    const person=this;

    // Hash the password only if it is mfoied or new record
    if(!person.isModified('password')) return next();
    try {
        // generate hash password
        // Generating a salt using genSalt()
        const salt=await bcrypt.genSalt(10);
        
        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);

        // Override the plain password with hashed one
        person.password=hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword=async function(candidatePwd){
    try {
       const isMatch=await bcrypt.compare(candidatePwd,this.password); 
       return isMatch;
    } catch (error) {
        throw error;
    }
}

// Create Person Model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;