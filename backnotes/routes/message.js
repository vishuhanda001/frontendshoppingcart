var express = require("express");
var router = express.Router();  
var Message = require('../models/message');
var jwt = require("jsonwebtoken");
var User = require('../models/user');

router.get("/",function(req,res,next){


        Message.find({},((err,messages)=>{
            if(err){
                return res.status(500).json({
                    title:"Not getting Messages",
                    err:err
                })
            }
            res.status(201).json({
                title:"Success",
                obj:messages
            })
        }))

})

//limiting unauthenticated users to add messages using jwt token
router.use("/",function(req,res,next){
    jwt.verify(req.query.token,"secret",(err,decoded)=>{
        if(err){
            return res.status(401).json({
                title:"not authenticated",
                error:err
            })
        }
        next(); 
    })
})


// writing a message
router.post("/",function(req,res,next){

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user,(err,user)=>{
        if(err){
            return res.status(500).json({
                title:"an error occured",
                err:err
            })
        }

        var message = new Message({
            content:req.body.content,
            user:user._id
        });
        message.save((err,result)=>{
                if(err){
                    return res.status(500).json({
                        title:"an error occured",
                        err:err
                    })
                }
                user.messages.push(result._id);
                user.save();
                res.status(201).json({
                    message:"message saved",
                    obj:result
                })
        })
    
        
    })

    
})


router.put("/:id",(req,res,next)=>{
   var decoded = jwt.decode(req.query.token);

Message.findById(req.params.id,(err,message)=>{
        if(err){
            return res.status(500).json({
                title:"an error occured with this id",
                err:err
            })
        }
        if(!message){
            return res.status(500).json({
                title:"no message found with this id",
                err:err
            })
        }
        //to check the user who edits the message is the same user who created it
        if(message.user!=decoded.user._id){
            return res.status(401).json({
                title:"not authenticated",
                err:{"message":"users do not match"}
            })
        }


            message.content = req.body.content;
            message.save((err,result)=>{
                    if(err){
                        res.status(500).json({
                            title:"Error Occured while updating message",
                            obj:message
                        })  
                    }     
                    
                    res.status(200).json({
                        title:"Message Updated",
                        obj:result
                    })
            })
        
})

})


router.delete("/:id",(req,res,next)=>{

   var decoded = jwt.decode(req.body.token);

    Message.findById(req.params.id,(err,message)=>{
        


                if(err){
                    return res.status(500).json({
                        title:"an error occured with this id",
                        err:err
                    })
                }
                if(!message){
                    return res.status(500).json({
                        title:"no message found with this id",
                        err:err
                    })
                }

                //to check the user who deletes the message is the same user who created it
                if(message.user!=decoded.user._id){
                    return res.status(401).json({
                        title:"not authenticated",
                        err:{"message":"users do not match"}
                    })
                }
        
                    
                    message.remove((err,result)=>{
                            if(err){
                                res.status(500).json({
                                    title:"Error Occured while deleting message",
                                    obj:message
                                })  
                            }     
                            
                            res.status(200).json({
                                title:"Message Deleted",
                                obj:result
                            })
                    })
                
        })
        


})
      

module.exports = router;