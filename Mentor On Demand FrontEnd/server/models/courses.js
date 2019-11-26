const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const coursesSchema= new Schema ({
    coursename:String,
    coursefee : String,
    coursedetails: String,
    mentorname:String,
    coursetiming:String
    
});

module.exports=mongoose.model('courses', coursesSchema,'courses');