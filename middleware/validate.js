let jwt = require("jsonwebtoken");
let User = require("../db").import("../model/user");

module.exports = (req,res,next)=>{
    if(req.method == 'OPTIONS'){
        next();
    }
    else{
        let sessionToken = req.headers.authorization;
        if(!sessionToken){
            return res.status(401).send({
                auth: false,
                message: "No token has been provided"
            });
        }
        else{
            jwt.verify(sessionToken,process.env.SIGNATURE,(err,decoded)=>{
                if(decoded){
                    User.findOne({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then(user=>{
                        req.user = user
                        next();
                    },(err)=>{
                        res.send(500,err.message);
                    })
                }
                else{
                    res.send("Token not match");
                }
            });
        }
    }
}