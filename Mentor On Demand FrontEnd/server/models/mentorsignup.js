const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mentorsignupSchema= new Schema ({
    firstname : String,
    email : String,
    phonenumber : String,
    linkedin : String,
    select : String,
    experience : String,
    time : String,
    password : String,
    confirmpassword : String
});

module.exports=mongoose.model('mentorsignup', mentorsignupSchema,'mentorsignup');