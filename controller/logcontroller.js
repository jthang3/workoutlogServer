const express = require("express");
const route = express.Router();
const User = require("../db").import("../model/user");
const Log = require("../db").import("../model/log");

///creating a log for only the user with valid session token.
route.post("/",(req,res)=>{
    let data = {
        owner_id: req.user.id,
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };
    Log.create(data)
    .then(data=>{
        res.status(200).json({
            message: "Log Successfully created",
            log: data
        });
    },(err)=>{
        res.send(400,err.message);
    })
});


///Get all log for individual user
route.get("/",(req,res)=>{
    Log.findAll({
        where: {
            owner_id: req.user.id
        }
    })
    .then(logs=>{
        res.status(200).json({
            Log: logs
        }
        )
    },(err)=>{
        res.send(500,err.message);
    })
});

//get individual log by id
route.get("/:id",(req,res)=>{
    Log.findOne({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
    .then(log=>{
        res.status(200).json({
            log: log
        });
    },(err)=>{
        res.send(500,err.message);
    })
});

//Allows individual logs to be updated by a user.
route.put("/:id",(req,res)=>{
    let id = req.params.id;
    let updateLog = {
        owner_id: req.user.id,
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };
    Log.update(updateLog,{
        where: {
            id: id
        }
    })
    .then(log=>{
        res.status(200).json({
            message: "Log successfully updated",
        })
    },(err)=>{
        res.send(500,err.message);
    })
});

//Allows individual logs to be deleted by a user.
route.delete("/:id",(req,res)=>{
    let id = req.params.id;
    let owner_id = req.user.id;
    Log.destroy({
        where: {
            id: id,
            owner_id: owner_id
        }
    })
    .then(data=>{
        res.send("You removed a log");
    },(err)=>{
        res.send(500,err.message);
    })
});
module.exports = route;