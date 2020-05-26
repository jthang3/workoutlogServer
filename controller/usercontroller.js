const express = require("express");
const router = express.Router();
const table = require("../db").import("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



//sign up

router.post("/register",(req,res)=>{
    //user provide the username and password. Password will be hashed using bcryptjs
    let data = {
        username:req.body.username,
        passwordhash:bcrypt.hashSync(req.body.password,10)
    }
    //providing the data to the table. Give the user a token for one day. 
    table.create(data)
        .then(data=>{
            let token = jwt.sign({id: data.id},process.env.SIGNATURE,{expiresIn: 60*60*24});
            res.status(200).json({
                account: data,
                message: "Successfully created",
                sessionToken: token
            })
        },(err)=>{
            res.status(401).send(err,err.message);
        })
        .catch(console.log)
})

//login
router.post("/login",(req,res)=>{
    //looking for the username in the database that matches the username provided by the user. 
    table.findOne({
        where:{
            username: req.body.username
        }
    })
    //if the username exist in the table it will check the password.
    .then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.passwordhash,(err,matches)=>{
                //if the password is matched the user will then again assign the token for one day. 
                if(matches){
                    let token = jwt.sign({id: user.id},process.env.SIGNATURE,{expiresIn: 60*60*24});
                    res.status(200).json({
                        user: user,
                        message: "Successfully logged in",
                        sesstionToken: token
                    })
                }
                else{
                    res.status(401).json({
                        err: "Password not matches, please try again."
                    })
                }
            })
        }
        else{
            res.status(501).json({
                err: "User not found. Please create an account first!"
            })
        }
    },(err)=>{
        console.log(err,err.message);
    })
});

module.exports = router;