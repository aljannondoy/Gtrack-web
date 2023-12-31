const {sequelize} = require("sequelize");
require('dotenv').config("../../.env");
const jwt = require("jsonwebtoken");
const user=require("../../models/user");
const schedule=require("../../models/schedule");
var C = require("crypto-js");
const truck=require("../../models/truck");
const e = require("express");





// Start of Truck Model Controllers


exports.addTruck = async(req, res) => {
    if(req.body.accessToken){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
            var admin = await user.model.findOne({
                where:{
                    user_id:JSON.parse(decoded.user_id).user_id,
                    user_type:"Admin"
                }
            })
            if (admin) {
                let truckExist = await truck.model.findAll({
                    where:{
                        plate_no:req.body.plate_no
                    }
                })
                if (truckExist.length === 0) {
                    let data = await truck.model.create({
                        user_id:admin.user_id,
                        plate_no:req.body.plate_no,
                        model:req.body.model,
                        active:1
                    })
                    if (data) {
                        res.send({success:true,message:"Truck Record Successfully Created"});

                    }
                } else {
                    res.send({success:false,message:"Truck Record already exists"});
                }
            } else {
                res.send({success:false,message:"Something Big went wrong you don't have admin rights"});
            }
        }
    )}
}

exports.getTrucks = async(req, res) => {
    let trucksActive =await truck.model.findAll({
        order: [['createdAt','DESC']],
        where:{
            active:1,
            deletedAt:null
        },
        include:[{
            model: user.model, as:"truckUser"
        }
        ]
    });
    let trucksInactive =await truck.model.findAll({
        where:{
            active:0,
            deletedAt:null
        },
        include:[{
            model: user.model, as:"truckUser"
        }
        ]
    });
    res.send({ success:true, data:{trucks:trucksActive, inactives:trucksInactive}});
}


exports.updateTruck = async(req, res) => {
    let check = await truck.model.findOne({
        where:{
            plate_no:req.body.plate_no
        }
    })
    if (check && req.params.id!=check.truck_id) {
        return res.send({success:false,message:"Truck with that plate number already exists"});
    }
    let data = await truck.model.update(
        {
            plate_no: req.body.plate_no,
            model: req.body.model
        },{
            where:{
                truck_id: req.params.id
            }
        }
    )
    if (data) {
        res.send({success:true,message:"Truck Record Successfully Updated"});
    } else {
        res.send({success:false,message:"Truck with that plate number already exists"});
    }
  
}
exports.deleteTruck = async(req, res) => {
    
    let data = await truck.model.destroy({
        where:{
            truck_id:req.body.id
        }
    })
    if (data) {
        return res.send("Truck Record successfully deleted");
    }else{
        return res.send("Something went wrong")
    }

}


exports.deactivateTruck = async(req,res) => {  //move to maintenance
    if (req.body.accessToken) {  
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
            var decodedData=JSON.parse(decoded.user_id);
            var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
            if (req.body.password === bytes.toString(C.enc.Utf8)) {
                let data = await truck.model.update(
                    {
                        active:0
                    },{
                        where:{
                            truck_id:req.params.id
                        }
                    }
                )
                if (data) {
                    res.send({success:true,message:"Truck Record Moved to Under Maintenance"});
                } else {
                    res.send("something went wrong")
                }
            } else {
                res.send({success:false,message:"Password is incorrect"});
            }          
        })
    }
}




exports.activateTruck = async(req,res) => {     //move to active trucks
    jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        if (req.body.password === bytes.toString(C.enc.Utf8)) {
            let data = await truck.model.update(
                {
                    active:1
                },{
                    where:{
                        truck_id:req.params.id
                    }
                }
            )
            if (data) {
                res.send({success:true,message:"Truck Record Moved to Garbage Trucks"});
            } else {
                res.send({success:false,message:"Cannot activate truck"});
            }
        } else{
            res.send({success:false,message:"Incorrect password."});
        }         
    })
}