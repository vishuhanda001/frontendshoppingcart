var express = require("express");
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


// router.get("/",function(req,res,next){

//     User.findOne({},(err,doc)=>{
//             if(err){
//                 return res.status(500).json({
//                     title:"an error ocuured",
//                     err:err
//                 })
//             }
//                 res.status(200).json({
//                     title:"success",
//                     obj:doc
//                 })
//     })

// })


// router.post("/",function(req,res,next){

// var user = new User({
//     firstName:"vishu",
//     lastName:"handa",
//     password:"super-secret",
//     email:req.body.email
//     })

//     user.save((err,result)=>{
//         if(err){
//             return res.status(500).json({
//                     title:"error while saving user",
//                     err:err
//             });
//         }
//         res.status(201).json({
//             title:"User saved Successfully",
//             obj:result
//         })
//     });                // store user object in collection



// })



//for sign up
router.post("/", (req, res, next) => {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    })

    user.save((err, result) => {
        if (err) {
            return res.status(500).json({
                title: "an error occured",
                error: err
            })
        }

        res.status(200).json({
            message: "User Created",
            obj: result
        });
    });


})

//for sign in
router.post("/signin", (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: "an error occured",
                err: err
            })
        }
        if (!user) {
            return res.status(401).json({
                title: "Login Failed",
                obj: { message: "Invalid login credentials" }
            })
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: "Login Failed",
                obj: { message: "Invalid login credentials" }
            })
        }

        var token = jwt.sign({user:user},'secret',{expiresIn:7200})
        res.status(200).json({
            title: "Successfully logged in",
            token:token,
            userId:user._id
        })
    });
});



module.exports = router;