const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');
 require('dotenv').config({path:path.join(__dirname,'.env')})
const main_routes = require('./routes/main_routes');
const fileUpload=require('express-fileupload')
const Session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type');


    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser())
app.use(Session({secret:'hehe'}))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())
app.use(fileUpload())
app.use('/',main_routes)

const PORT=process.env.PORT || 2555
app.listen(PORT, () => {
    console.log("im working on 2555");
});
