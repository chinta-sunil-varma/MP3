const express = require('express')
const sectionRouter  =express.Router()
const bodyParser = require('body-parser')
const teacher = require("../models/teacher");


const { Login, Student, Teacher, Course, Section } = teacher

sectionRouter.use(bodyParser.json())

sectionRouter.route('/courses/:secID')
.get((req , res , next)=>{
    Course.find({section:req.params.secID})
    .then((data)=>{res.json(data)
    console.log("data being sent to client" ,data)
    })
})


module.exports = sectionRouter;