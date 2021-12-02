const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../models/Role')


exports.signup = async(req,res,next)=>{
    
    const {username,email,password,roles} = req.body
    const user = new User({
        username,
        email,
        password
    })
    if(roles){
        const foundRoles = await Role.find({name:{$in :roles}})
        user.roles = foundRoles.map(role =>role._id)
    }else{
        const role = await Role.findOne({name:"user"})
        
        user.roles = [role._id]
        console.log(user)
    }
   /* let error = user.validateSync();
    if(user.username === ''){
        res.status(404).json({
            message:error.errors['username'].message
        })
    }else if(user.email === ''){
        res.status(404).json({
            message:error.errors['email'].message
        })
    }else if(user.password === ''){
        res.status(404).json({
            message:error.errors['password'].message
        })
    }*/
   
    user.password = await user.encryptPassword(user.password)
    await user.save()
    const token = jwt.sign({id:user._id},config.secret,{
        expiresIn:60*60*24

    })
    res.json({
        auth:true,
        token
    })
   }




exports.signin = async(req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).send('The email doesn`t exist')
    }
    const validPassword = await user.validatePassword(password)
    if(!validPassword){
        return res.status(404).json({auth:false,token:null})
    }
    const token = jwt.sign({id:user._id},config.secret,{
        expiresIn:60*60*24
    })
    res.json({auth:true,token})
}
exports.me = async(req,res,next)=>{

    
    const decoded = jwt.verify(token,config.secret)
    const user = await User.findById(req.userId,{password:0})
    if(!user){
        return res.status(404).send('No User Found')
    }
    res.json(user)
}