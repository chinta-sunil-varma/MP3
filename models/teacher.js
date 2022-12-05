const mongoose =require('mongoose')

const Mongoose =require('mongoose').Mongoose
const instance6 = new Mongoose()

const schema =mongoose.Schema
const url = 'mongodb+srv://miniproject3:lmsit2_123@lms.xjeulfs.mongodb.net/?retryWrites=true&w=majority'

main2().catch((err) => console.log(err));
async function main2() {
    
    await instance6.connect(url,{useNewUrlParser:true});
    console.log("connection to db4 is madee succesfuly");
}

const teacherSchema = new schema({
    Name:{
        type:String,
        required:true
    },
    teachId:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    }

})


const courseSchema = new schema({
    courseID:{
        type:String, // contains the sec info also
        required:true
    },
    Name:{
        type:String, 
        required:true
    },
    facultyId:{
        type:String, 
        required:true
    },
    dept:{
        type:String, 
        required:true
    },
    section:{
        type:String, 
        required:true

    }
})

const quesSchema = new schema({
    question:{
        type:String,
    },
    answer:[{type:String}]
})

const testSchema = new schema({
    course:{
        type:String,
        required:true,
    } ,
    facultyId:{
        type:String,
        required:true,
    },
    startTime:{
        type:Date,
        required:true,
    },
    endTime:{
        type:Date,
        required:true,
    },
    queAns:[quesSchema],

    answer:{
        type:String,
        required:true
    }
        
})

const studentSchema = new schema({
    Name:{
        type:String,
        required:true
    },
    Roll:{
        type:String,
        required:true
    },
    Sec:{
        type:String,
        required:true
    }

})
const loginSchema= new schema({
    Name:{
        type:String,
        required:true
    },
    Password:
    {
        type:String,
        required:true
    },
    FacultyStat:
    {
        type:Boolean,
        required:true
    }
})

var Student = instance6.model('Student' , studentSchema)

var Test = instance6.model('Test' , testSchema)

var Course = instance6.model('Course',courseSchema)

var Teacher = instance6.model('Teacher' , teacherSchema)
var Login = instance6.model('Login' , loginSchema)

// Login.insertMany(
//    [
//     {Name:'160120737114',Password:"sunil",FacultyStat:false},
//     {Name:'160120737107',Password:"sai",FacultyStat:false},
//     {Name:'160120737109',Password:"sathwick",FacultyStat:false},
//     {Name:'160120737119',Password:"ganesh",FacultyStat:false},
//     {Name:'1',Password:"aravinda",FacultyStat:true},
//    ]
// )
// .then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// });

module.exports ={Student,Teacher,Login,Test,Course}