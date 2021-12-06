const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../models/Role')


exports.signup = async(req,res,next)=>{
    
    const {username,email,password,roles} = req.body
    const emailUniq = await User.findOne({email:email})
    const usernameUniq = await User.findOne({username:username})

    if(username === '' || email === '' || password === ''){
        return res.status(404).send('please complete the missing field')
    }
    if (email === emailUniq || username === usernameUniq){
        return res.status(404).send('there is already someone registered with that username or email, please try another')
    }

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

    }
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

    
    const user = await User.findById(req.userId,{password:0})
    if(!user){
        return res.status(404).send('No User Found')
    }
    res.json(user)
}