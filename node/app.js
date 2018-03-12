const express = require('express');
const app = express();
const mongoose = require('mongoose');
const signUpModel = require('./signUpModel');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server listing to port 5000");
});

mongoose.connect('mongodb://webapp:12345678@ds155218.mlab.com:55218/sample-db').then((data) => {


    console.log('connected to database');
});

app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/')
})

app.post('/signup', (req, res) => {
    debugger
    console.log(req.body);

    signUpModel.findOne({ "loginName": req.body.loginName }).then((data) => {

        if (data == null) {

            var signupObj = new signUpModel(req.body).save().then((data) => {
                if (data.password)
                    data.password = "******";
                res.send({ "Status": "success", "Data": data });
            });

        } else {
            res.send({ "Status": "already exists" });
        }

    });

});

app.post('/login', (req, res) => {
    signUpModel.find({ 'loginName': req.body.loginName, 'password': req.body.password }).then((data) => {
        console.log("xxx",data);
        if (data.length > 0) {
            if (data[0]['password'])
                data[0]['password'] = "******";
            res.send({ "Status": "success", "session": data });
        }
        else
            res.send({ "Status": "failed" });
    });
});

