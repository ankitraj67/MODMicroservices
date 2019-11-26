const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const studentsignupSchema= new Schema ({
    firstname : String,
    email : String,
    password : String,
    confirmpassword : String
});


module.exports=mongoose.model('studentsignup', studentsignupSchema,'studentsignup');

