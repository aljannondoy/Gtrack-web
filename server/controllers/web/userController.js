require('dotenv').config("./.env");
const user = require("../../models/user");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const { Op} = require('sequelize');
var moment = require('moment');
const {generateAccessToken} = require('../../helpers/generateAccessToken');

exports.registerEmployee = async(req, res) => {
    let data = await user.model.findAll({
        where:{
            email:req.body.email
        }
    })
    if(data.length === 0){
       req.body.password = "p@ssw0rd";
       var hash = C.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
    //    hash = bcrypt.hashSync(req.body.password,saltRounds);
    console.log( hash);
       req.body.password = hash;
       await user.model.create(req.body);
       return res.status(200).send("Sign-up success");
    }else{
        return res.status(207).send("Account Exists");
    }
}
exports.login = async(req, res) => {
    let data = await user.model.findOne({
        where:{
            email:req.body.email,
            user_type:"Admin",
            status:true
        }
    })
    if(data !== null ){
        
        var bytes  = C.AES.decrypt(data.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if(originalText === req.body.password && data.password != ""){
            const accessToken = generateAccessToken(data);
            res.send({success:true,message:"Login Successful!",data:data, accessToken})
        }else{
            res.send({success:false,message:"The credentials provided does not match."});
        }
    }else{
        res.send({success:false,message:"Account not found."});
    }
}
exports.logout = async(req, res)=>{
    res.status(200).json("You logged out Successfully");
}
exports.display = async(req, res)=>{
    let drivers = await user.model.findAll({
        order: [['createdAt','DESC']],
        where:{
            user_type:"Driver",
            status:true
        }
    })
    let admins = await user.model.findAll({
        order: [['createdAt','DESC']],
        where:{
            email:{[Op.not]: 'gtrackcompostela@gmail.com'},
            user_type:"Admin",
            status:true
        }
    })
    let inactives = await user.model.findAll({
        where:{
            email:{[Op.not]: 'gtrackcompostela@gmail.com'},
            user_type:{[Op.not]: 'Resident'},
            status:false
        }
    })
    res.send({success:true,data:{admins:admins,drivers:drivers,inactives:inactives}});
}
exports.deactivate = async(req, res)=>{
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if(originalText===req.body.password){
            await user.model.update({status:false},{
                where:{
                    email:req.body.email
                }
            })
            // let drivers = await user.model.findAll({
            //     where:{
            //         user_type:"Driver",
            //         status:true
            //     }
            // })
            // let admins = await user.model.findAll({
            //     where:{
            //         user_type:"Admin",
            //         status:true
            //     }
            // })
            // let inactives = await user.model.findAll({
            //     where:{
            //         user_type:{[Op.not]: 'Resident'},
            //         status:false
            //     }
            // })
            res.send({success:true,message:"Successfully deactivated employee."});
        }else{
            res.send({success:false,message:"Password did not match",data:null});
        }
    })
    
}
exports.activate = async(req, res)=>{
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if(originalText===req.body.password){
            await user.model.update({status:true},{
                where:{
                    email:req.body.email
                }
            })
            // let drivers = await user.model.findAll({
            //     where:{
            //         user_type:"Driver",
            //         status:true
            //     }
            // })
            // let admins = await user.model.findAll({
            //     where:{
            //         user_type:"Admin",
            //         status:true
            //     }
            // })
            // let inactives = await user.model.findAll({
            //     where:{
            //         user_type:{[Op.not]: 'Resident'},
            //         status:false
            //     }
            // })
            res.send({success:true,message:"Successfully reactivated employee."});
        }else{
            res.send({success:false,message:"Password did not match",data:null});
        }
    })   
}
exports.register = async(req, res)=>{
    let acc = await user.model.findOne({
        where:{
            email:req.body.email
        }
    })
    if(acc===null){
        let password = 'p@ssw0rd' 
        acc=await user.model.create({
            email:req.body.email,
            password:C.AES.encrypt(password, process.env.SECRET_KEY).toString(),
            fname:req.body.fname,
            lname:req.body.lname,
            user_type:req.body.user_type,
            purok:req.body.purok,
            street:req.body.street,
            barangay:req.body.barangay,
            town:"Compostela",
            postal_code:"6003",
            gender:req.body.gender,
            contact_no:req.body.contact
        });
        // let drivers = await user.model.findAll({
        //     where:{
        //         user_type:"Driver",
        //         status:true
        //     }
        // })
        // let admins = await user.model.findAll({
        //     where:{
        //         user_type:"Admin",
        //         status:true
        //     }
        // })
        // let inactives = await user.model.findAll({
        //     where:{
        //         user_type:{[Op.not]: 'Resident'},
        //         status:false
        //     }
        // })
        res.send({success:true,message:"Employee successfully Created"});
    }else{
        res.send({success:false,message:"Account already exists",data:null});
    }   
        
}

exports.resetPassword=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account){
        let acc=await user.model.update({password:C.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),},{
            where:{
                email:req.body.email
            }
        })
        acc = await user.model.findOne({where:{email:req.body.email}});
        res.send({success:true,message:"Password reset successful.",data:acc});
    }else{
        res.send({success:false,message:"Cannot reset password.",data:null});
    }
}

exports.verifyEmail=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account){
        let acc=await user.model.update({email_verified_at:moment()},{
            where:{
                email:req.body.email
            }
        })
        acc = await user.model.findOne({where:{email:req.body.email}});
        res.send({success:true,message:"Email verification successful.",data:acc});
    }else{
        res.send({success:false,message:"Cannot verify email.",data:null});
    }
}

exports.forgotPassword=async (req,res)=>{
    let account=await user.model.findOne({ 
        where: { 
            email: req.body.email,
            user_type: "Admin",
            status:true
        } 
    });
    if(account){
        res.send({success:true,message:"Email retrieved.",data:account});
    }else{
        res.send({success:false,message:"Cannot find email address.",data:null});
    }
}

exports.resetEmail=async (req,res)=>{
    let account=await user.model.findOne({ 
        where: { 
            email: req.body.currentEmail,
            status:true
        } 
    });
    if(account){
        let acc=await user.model.update({email:req.body.revertEmail},{
            where:{
                email:req.body.currentEmail
            }
        });
        res.send({success:true,message:"Email retrieved.",data:acc});
    }else{
        res.send({success:false,message:"Cannot find email address.",data:null});
    }
}
