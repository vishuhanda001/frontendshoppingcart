var express = require('express');
var router = express.Router();

/* GET home page. */



// router.all("/*",function(req,res,next){
//   console.log("all for index first");
//   next();
// })
router.get('/', function(req, res, next) {
  res.send("hey there babe");
  next();
},function(req,res,next){
  console.log("user logged on : "+new Date()+"req method:- "+req.method+" baseurl:- "+req.url);
  
});

router.get('/abc',function(req,res,next){
  // res.send("abc");
  console.log("abc");
  next();
},function(req,res,next){
  res.send("def");
  res.end();
});

module.exports = router;
