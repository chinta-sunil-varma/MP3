const mongoose = require("mongoose");
const Mongoose = require("mongoose").Mongoose;

var instance1=new Mongoose()
var instance2=new Mongoose()
var instance3=new Mongoose()


main().catch((err) => console.log(err));
main1().catch((err) => console.log(err));
main2().catch((err) => console.log(err));
async function main() {
 
        await instance1.connect(process.env.MONGO_URL,{useNewUrlParser:true});
        console.log("connection to db is madee succesfuly");
        
    
    
    
}
async function main1() {
    
    await instance2.connect('mongodb+srv://sunil:heheboi123@cluster0.afcgait.mongodb.net/student?retryWrites=true&w=majority',{useNewUrlParser:true});
    console.log("connection to db2 is madee succesfuly");
}
async function main2() {
    
    await instance3.connect('mongodb://localhost:27017/attendance',{useNewUrlParser:true});
    console.log("connection to db3 is madee succesfuly");
}

const model = new mongoose.Schema({
    "": Number,
    ID: Number,
    NAME: String,
    SGPA: Number,
    CGPA: Number,
});

const auth_model = new mongoose.Schema({
    user: String,
    pass: String,
    api:String,
});
const apiList=new mongoose.Schema({
    api:String,
})
const student=new mongoose.Schema({
    ID:Number,
    NAME:String,
    SGPA:Number,
    CGPA:Number
})
const attendance_schema= new mongoose.Schema({
    date:
    {
        type:String,
        required:true,
       
        
    },
    name:
        {
          type:String,
          required:true,
          unique:true,
        },
    subject:
    [{
        
        section:String,
        values:
        {
            type:Array,
            required:true,
            unique:true
        }
    }]
})
const mod1 = instance1.model("mod1", model, "sem1");
const mod2 = instance1.model("mod2", model, "sem2");
const mod3 = instance1.model("mod3", model, "sem3");
const attendance = instance3.model("attendance", attendance_schema);
const auth_mod = instance1.model("auth_mod", auth_model);
const api_model = instance1.model("api_model", apiList);
const student_mod_it1 = instance2.model("student_mod_it1", student,'it1');
const student_mod_it2 = instance2.model("student_mod_it2", student,'it2');
const student_mod_it3 = instance2.model("student_mod_it2", student,'it3');
module.exports={mod1:mod1,mod2:mod2,mod3:mod3,auth_mod:auth_mod,api_model:api_model,student_mod_it1:student_mod_it1,attendance:attendance,
    student_mod_it2:student_mod_it2,student_mod_it3:student_mod_it3
               }