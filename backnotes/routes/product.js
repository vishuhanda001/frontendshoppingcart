var express = require("express");
var router = express.Router();

router.all("/*",function(req,res,next){
console.log("all for products firts");
    next();
}).get("/products",function(req,res,next){
    res.send("hi products");
    res.end();
})

module.exports = router;