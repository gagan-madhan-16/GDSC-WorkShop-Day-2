const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('mongodb connected connected');
})
.catch((e)=>{
    console.log('failed');
})

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User', user);

module.exports = {
    User
};