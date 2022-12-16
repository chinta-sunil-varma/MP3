const express = require("express");
const bcrypt = require("bcrypt");
const database = require("../models/database");
const teacher = require("../models/teacher");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');


const { mod1, mod2, mod3, auth_mod, api_model, student_mod_it1, student_mod_it2, student_mod_it3, attendance } = database;
const { Login, Student, Teacher, Course, Section } = teacher


const routes = express.Router();
routes.use(bodyParser.json())
routes.use(bodyParser.text())
checker = (req, res, next) => {
  const key = req.headers.key;
  console.log(key);

  api_model
    .findOne({ api: key })
    .then((result) => {
      if (result == null) {
        return res.json({ 'error': "api key is not valid check again" });
      }
      console.log("verified api here");
      next();
    })
    .catch((err) => {
      console.log("error occured", err);
    });
};

routes.get('/certificate/:sem/:roll/', async (req, res) => {
  const sem = req.params.sem
  const id = req.params.roll
  console.log(req.headers.hehe)

  if (sem == 1) {
    mod1
      .find({ ID: id })
      .then((result) => {
        console.log(result);
        if (result.length == 0) {
          return res.json({ error: "DATA NOT FOUND" });
        }
        const name = result[0].NAME
        res.render('certificate', { name: name });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (sem == 2) {
    mod2
      .find({ ID: id })
      .then((result) => {
        console.log(result);
        const name = result[0].NAME
        if (result.length == 0) {
          return res.json({ error: "DATA NOT FOUND" });
        }
        res.render('certificate', { name: name });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (sem == 3) {
    mod3
      .find({ ID: id })
      .then((result) => {
        console.log(result);
        const name = result[0].NAME
        if (result.length == 0) {
          return res.json({ error: "DATA NOT FOUND" });
        }
        res.render('certificate', { name: name });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if ((sem > 3) | (sem < 1)) {
    res.json({ error: 'Data not found!' });
  }
});

routes.post("/teacher/upload", (req, res) => {
  console.log(req.body)
  // console.log(req.files.fileName)
  const file = req.files.fileName
  if (!fs.existsSync(path.join("D:", "CBIT_RESULT_API", "uploads", req.body.course)))
    fs.mkdirSync(path.join("D:", "CBIT_RESULT_API", "uploads", req.body.course))
  uploadPath = path.join("D:", "CBIT_RESULT_API", "uploads", req.body.course, file.name)
  if (fs.existsSync(uploadPath)) {
    return res.send({ 'status': 'fail', message: 'File already Exists!' })
  }

  file.mv(uploadPath,async function (err) {
    if (err)
      console.log(err)
    else {
    const doc= await Section.findOne({courseID:req.body.courseShort})
    if(doc!=null)

    {
      doc.sections=[...doc.sections,{secName:req.body.section,secDesc:req.body.secDesc,file:file.name}]
    try{
      const result=await doc.save()
      console.log(result)
      res.send({ 'status': 'success', message: 'uploaded' })
    }
    catch(err)
    {
       console.log(err)
    }
    }
    else
    {
       Section.insertMany({courseID:req.body.courseShort,fullName:req.body.course,sections:{secName:req.body.section,secDesc:req.body.secDesc,file:file.name}})
       .then((result) => {
        console.log(result)
        res.send({ 'status': 'success', message: 'uploaded' })
       }).catch((err) => {
        console.log(err)
       });
      

    }
      
    }
  })
})

routes.get('/views/section',(req,res)=>
{
  console.log(req.session.sec)
  Section.find({courseID:{ $regex:`${req.session.sec}`}})
  .then((result) => {
    console.log(result)
    res.send(result)
  }).catch((err) => {
    console.log(err)
  });
})

routes.post('/general/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username.slice(0, 4) === '1601') {
    //student login
    Login.findOne({ Name: username, Password: password })
      .then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      });

  }
  else {
    //faculty login
  }
})


routes.get("/check/:user/:pass", async (req, res) => {
  const user = req.params.user;
  const pass = req.params.pass;
  try {
    const obj = await auth_mod.findOne({ user: user });
    console.log(obj)
    bcrypt.compare(pass, obj.pass)
      .then((result) => {
        if (result == true) {
          return res.json({ api: obj.api });

        }

        throw new Error("user name or password not correct");
      }).catch((err) => {
        res.json({ 'error': err })
      });

  } catch (error) {
    res.json({ 'error': 'error processing your request' });
  }
});

routes.get("/register/:name/:pass", (req, res) => {
  const name = req.params.name;
  const pass = req.params.pass;
  auth_mod
    .findOne({ user: name })
    .then((result) => {
      if (result) {
        console.log("found one succesfully", result);
        return res.json({ 'error': "Accout Already Exists!" });
      }
      bcrypt.hash(pass, 10).then(function (hash) {
        // Store hash in your password DB.
        const api = pass + process.env.KEY;
        bcrypt
          .hash(api, 10)
          .then((result) => {

            result = result.replaceAll('/', '$')

            auth_mod
              .insertMany({ user: name, pass: hash, api: result })
              .then((innerresult) => {
                api_model
                  .insertMany({ api: result })
                  .then((result) => {
                    console.log(result);
                    console.log("succsfuly inserted in api collecton");
                    res.json({ 'api': result[0].api });
                  })
                  .catch((err) => {
                    console.log("eroor procesing request-1", err);
                  });
              })
              .catch((err) => {
                res.json({ 'error': "Something error happened!" });
              });
          })
          .catch((err) => {
            res.json({ 'error': "problem has occured!" });
          });
      });
    })
    .catch((err) => {
      res.json({ 'error': "There is an error processing your request" });
    });
});



routes.get("/result/:sem/:id/", checker, (req, res) => {
  const sem = parseInt(req.params.sem);
  const id = parseInt(req.params.id);
  // console.log(mod.it1_sem1)
  if (sem == 1) {
    mod1
      .find({ ID: id })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (sem == 2) {
    mod2
      .find({ ID: id })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (sem == 3) {
    mod3
      .find({ ID: id })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if ((sem > 3) | (sem < 1)) {
    res.send("DATA NOT FOUND");
  }
});
routes.get('/students/:section', (req, res) => {
  console.log(req.params.section)
  if (req.params.section === 'it1') {
    student_mod_it1.find().sort([['ID', 1]])
      .then((result) => {
        //  console.log(result)
        res.send(result)
      }).catch((err) => {
        console.log(err)
      });

  }
  else if (req.params.section === 'it2') {
    student_mod_it2.find().sort([['ID', 1]])
      .then((result) => {
        //  console.log(result)
        res.send(result)
      }).catch((err) => {
        console.log(err)
      });

  }

  else if (req.params.section === 'it3') {
    student_mod_it3.find().sort([['ID', 1]])
      .then((result) => {
        //  console.log(result)
        res.send(result)
      }).catch((err) => {
        console.log(err)
      });

  }

})
routes.post('/attendance/', (req, res) => {

  const { date, values, subject, section } = req.body
  attendance.findOne({ date: date, name: subject })
    .then((result) => {
      if (result) {
        res.send({ status: false, message: 'already inserted to this course' })
      }
      else {
        instance = new attendance({ date: date })
        attendance.insertMany({ date: date, name: subject, subject: { section: section, values: values } })
          .then((result) => {
            console.log(result)
            res.send({ status: true, message: 'succesfully inserted' })
          }).catch((err) => {
            console.log(err);
          });
      }
    }).catch((err) => {
      console.log('error in post attendacne ', err)
    });
  // console.log(date)
  // console.log(values)
  // console.log(subject)
  // console.log(section)

  // instance.subject.push({ values, name: subject, section })
  // instance.save()
  //   .then((result) => {
  //     console.log(result)
  //   }).catch((err) => {
  //        console.log(err)
  //   });

})
// ************************************************************



routes.post('/login', async (req, res) => {
  async function exe(response) {
    if (response) {
      //bcrypt this in future
      // bcrypt.compare(password, response.password, function (err, result) {
      //   // result == true
      //   if (result) {

      //    else
      //    {

      //    }
      //   }
      //   else {
      //     res.send({
      //       status: false, message: 'username or passwrod incorrect'
      //     })

      //   }
      // })

      if (response.FacultyStat) {
        req.session.faculty = true;
        req.session.id = roll
        // console.log(response.FacultyStat)
        const sections = []
        const result = await Course.find({ facultyId: roll })
        result.map((item) => {
          sections.push(item.Name + '-' + item.courseID)
        })
        req.session.sections = sections
        // console.log(req.session)

        return res.send({ faculty: true, status: true, message: 'logged in succesfuly' })

      }
      else {
        Student.findOne({ Roll: response.Name })
          .then((result) => {
            req.session.student = true;
            req.session.id = result.Roll
            req.session.sec = result.Sec
            req.session.name = result.Name
            return res.send({ status: true, message: 'logged in succesfuly' })
          }).catch((err) => {
            console.log(err)
            return res.send({ status: false, message: 'cannot logged in succesfuly' })
          });

        // console.log(response.FacultyStat)


      }

    }
    else {
      console.log('unable to fetch');
      return res.send({ status: false, message: 'credentials mis match' })

    }
  }

  console.log('touched')
  const { roll, password } = req.body
  if (roll === 'qwerty' && password === 'qwerty') {
    req.session.admin = true
    req.session.activeStat = true
    return res.send({ status: true, message: 'logged in succesfuly' })
  }
  if (roll.slice(0, 4) === '1601') {
    Login.findOne({ Name: roll, Password: password })
      .then((result) => {
        exe(result)
      }).catch((err) => {
        console.log(err)
      });

  }
  else {
    Login.findOne({ Name: roll, Password: password })
      .then((result) => {
        exe(result)
      }).catch((err) => {
        console.log(err)
      });

  }





})
routes.get('/teacher/sections', (req, res) => {
  // console.log("in teacher",req.session)
  res.send(req.session.sections)
})

routes.post('/add/section', (req, res) => {
  const { section, course, secDesc } = req.body

})
routes.get('/add/:section', (req, res) => {
  const { section } = req.params;
  console.log(req.params)
  Section.findOne({ courseID: section })
    .then((result) => {
      console.log(result)
      res.send(result)
    }).catch((err) => {
      console.log(err)
    });

})

routes.route('/sections/courses/:secID')
.get((req , res , next)=>{
    Course.find({section:req.params.secID})
    .then((data)=>{res.json(data)
    console.log("data being sent to client" ,data)
    })
})

routes.route('/sections/blocks')
.get((req , res , next)=>{
    const sec = req.body.sec
    const subject = req.body.course
    console.log("body inside blocks route " ,req.body)
    Section.find()
    .then((data)=>{
      // const arr = data.fullName.split("-")
      // if(arr[0]===subject && arr[2]===sec){
        console.log("data inside blocks route " , data[0]);
        res.json(data)
    console.log("data being sent to client" ,data)
      //}
      
    })
})


// ****************************************************************
routes.use((req, res) => {
  res.render('index');
});

module.exports = routes;
