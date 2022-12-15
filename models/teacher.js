const mongoose = require('mongoose')

const Mongoose = require('mongoose').Mongoose
const instance6 = new Mongoose()

const schema = mongoose.Schema
const url = 'mongodb+srv://miniproject3:lmsit2_123@lms.xjeulfs.mongodb.net/?retryWrites=true&w=majority'

main2().catch((err) => console.log(err));
async function main2() {

    await instance6.connect(url, { useNewUrlParser: true });
    console.log("connection to db4 is madee succesfuly");
}

const teacherSchema = new schema({
    Name: {
        type: String,
        required: true
    },
    teachId: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    }

})


const courseSchema = new schema({
    courseID: {
        type: String, // contains the sec info also
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    facultyId: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true

    }
})

const quesSchema = new schema({
    question: {
        type: String,
    },
    answer: [{ type: String }]
})

const testSchema = new schema({
    course: {
        type: String,
        required: true,
    },
    facultyId: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    queAns: [quesSchema],

    answer: {
        type: String,
        required: true
    }

})

const studentSchema = new schema({
    Name: {
        type: String,
        required: true
    },
    Roll: {
        type: String,
        required: true
    },
    Sec: {
        type: String,
        required: true
    }

})
const loginSchema = new schema({
    Name: {
        type: String,
        required: true
    },
    Password:
    {
        type: String,
        required: true
    },
    FacultyStat:
    {
        type: Boolean,
        required: true
    }
})

const sectionSchema = new schema(
    {
        courseID:
        {
            type: String,
            required: true
        },
        fullName:
        {
            type:String,
            required:true,
        },
        sections:
            [{
                secName:
                {
                    type: String,
                    required: true
                },
                secDesc:
                {
                    type: String,
                    required: true,
                },
                file:
                {
                    type:String
                }
            }]
    }
)

var Student = instance6.model('Student', studentSchema)
var Section = instance6.model('Section', sectionSchema)

var Test = instance6.model('Test', testSchema)

var Course = instance6.model('Course', courseSchema)

var Teacher = instance6.model('Teacher', teacherSchema)
var Login = instance6.model('Login', loginSchema)

// Section.insertMany(
//     [
//         {
//             courseID: '20-IT3-34',
        
//             sections:
//                 [{
//                     secName: "another heading1", secDesc: "this is another section"
//                 },
//                 {
//                     secName: "another heading2", secDesc: "this is another section"
//                 },
//                 {
//                     secName: "another heading3", secDesc: "this is another section"
//                 },
//                 {
//                     secName: "another heading4", secDesc: "this is another section"
//                 }
//                 ]
        
//     },

//     ]
// )
//     .then((result) => {
//         console.log(result)
//     }).catch((err) => {
//         console.log(err)
//     });

module.exports = { Student, Teacher, Login, Test, Course, Section }