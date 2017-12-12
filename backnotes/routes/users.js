var express = require('express');
var router = express.Router();

/* GET users listing. */


router.all("/*",function(req, res, next){
  console.log("all for users");
  next();
})
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
