const express= require('express');
const jwt = require('jsonwebtoken');
const router=express.Router();
const User = require('../models/studentsignup');
const Mentor = require('../models/mentorsignup');
const Admin = require('../models/adminlogin');
const Courses=require('../models/courses')
const mongoose=require('mongoose');


const db='mongodb+srv://ankitraj:12345@cluster0-tcmnu.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db,{useNewUrlParser:true , useUnifiedTopology:true}, err =>{
    if(err){
        console.error('error'+err);
    }
    else{
        console.log('connected to mongodb');
    }

})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token ==='null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secret key');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId=payload.subject;
    next();
}


router.get('/',(req,res)=>{
    res.send('From API routes');
})


router.post('/studentsignup',(req,res)=>{
    let studentData=req.body;
    let user= new User(studentData);
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error);
        }
        else{ 
            let payload = { subject : registeredUser._id};
            let token = jwt.sign(payload , 'secret key');
            res.status(200).send({token});
        }
    });
})



router.post('/studentlogin',(req,res)=>{
    let studentData=req.body;

    User.findOne({email: studentData.email},(error,user)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send('invalid email');
            }else
            if(user.password !== studentData.password){
                res.status(401).send('invalid password');
            }else{
                let payload = { subject : user._id };
                let token = jwt.sign(payload, 'secret key');
                res.status(200).send({token, user});
            }
        }
    })
})




router.post('/mentorsignup',(req,res)=>{
    let mentorData=req.body;
    let mentor= new Mentor(mentorData);
    mentor.save((error,registeredUser)=>{
        if(error){
            console.log(error);
        }
        else{
            let payload = {subject : registeredUser._id};
            let token = jwt.sign(payload,'secret key');
            res.status(200).send({token});
        }
    });
})


router.post('/mentorlogin',(req,res)=>{
    let mentorData=req.body;

    User.findOne({email: mentorData.email},(error,mentor)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!mentor){
                res.status(401).send('invalid email');
            }else
            if(mentor.password !== mentorData.password){
                res.status(401).send('invalid password');
            }else{
                let payload = {subject : mentor._id};
                let token = jwt.sign(payload,'secret key');
                res.status(200).send({token});
            }
        }
    })
})


router.post('/adminlogin',(req,res)=>{
    let adminData=req.body;

    Admin.findOne({email: adminData.email},(error,admin)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!admin){
                res.status(401).send('Invalid Email');
            }else
            if(admin.password !== adminData.password){
                res.status(401).send('Invalid Password');
            }else{
                let payload = { subject : admin._id };
                let token = jwt.sign(payload, 'secret key');
                res.status(200).send({token, admin});
            }
        }
    })
})
//return course list
router.get('/courses',async(req,res)=>{
    try{
        let courselist=await Courses.find().exec();
        res.send(courselist);
    }catch(err){
        res.status(500).send(err);
    }
})


// add course
router.post('/admin-dashboard/addcourse',(req,res)=>{
    let courseData=req.body;
    let course = new Courses(courseData);
    course.save((error,registeredCourse)=>{
        if(error){
            console.log(error);
            
        }
        else{
            res.send();
            console.log("hekko")
            console.log(registeredCourse);
        }
    })
})
//getstudentlist
router.get('/admin-dashboard/studentlist',async(req,res)=>{
    try{
        let studentlist=await User.find().exec();
        res.send(studentlist);
    }catch(err){
        res.status(500).send(err);
    }
})

//getmentorlist
router.get('/admin-dashboard/mentorlist',async(req,res)=>{
    try{
        let mentorlist=await Mentor.find().exec();
        res.send(mentorlist);
    }catch(err){
        res.status(500).send(err);
    }
})
//getcourselist
router.get('/admin-dashboard/courselist',async(req,res)=>{
    try{
        let courselist=await Courses.find().exec();
        res.send(courselist);
    }catch(err){
        res.status(500).send(err);
    }
})
//edit course
router.put('/editcourse', (req, res) => {
    let editCourseData = req.body
    console.log(editCourseData)
    let courseId = req.body._id
    Courses.findByIdAndUpdate(courseId,req.body,{new: true},(err, courseEdited) => {
      if (err) {
        console.log(err)      
      } else {
        res.status(200).send(courseEdited)
      }
    })
  });

  //edit mentor
  router.put('/editmentor', (req, res) => {
    let editMentorData = req.body
    console.log(editMentorData)
    let mentorId = req.body._id
    Mentor.findByIdAndUpdate(mentorId,req.body,{new: true},(err, mentorEdited) => {
      if (err) {
        console.log(err)      
      } else {
        res.status(200).send(mentorEdited)
      }
    })
  });


  //delete course
  router.post('/deleteCourse', (req, res) => {
    let courseData = req.body
    Courses.remove({_id: courseData._id}, (err, deletedCourse) => {
      if (err) {
        console.log(err)      
      } else {
        res.status(200).send('Course Id '+courseData._id +' is Deleted')
      }
    })
  });

module.exports=router;