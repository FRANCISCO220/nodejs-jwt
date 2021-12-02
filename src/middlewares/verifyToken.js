const jwt = require('jsonwebtoken')
const config = require('../config');
const User = require('../models/User');
const Role = require('../models/Role')

exports.verifyToken = (req,res,next)=>{
    
    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({
                auth:false,
                message:'no token provided'
            })
        }
        const decoded = jwt.verify(token,config.secret)
        req.userId = decoded.id
        next()
    }catch(error){
        console.log(error)
    }
    
}

exports.isModerator = async(req,res,next)=>{
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in:user.roles}})
    for(let i=0;i<roles.length;i++){
        if(roles[i].name === 'moderator'){
            next()
        }
        return
    }
    return res.status(403).json({message:'requer Moderator role'})
}
exports.isAdmin = async(req,res,next)=>{
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in:user.roles}})
    for(let i=0;i<roles.length;i++){
        if(roles[i].name === 'admin'){
            next()
        }
        return
    }
    return res.status(403).json({message:'requer Admin role'})
}

