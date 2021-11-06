const User = require('../models/User')


exports.listUser = async(req,res)=>{
    const users = await User.find()
    return res.status(200).json({
        ok:true,
        users
    })
}

exports.oneUser =async(req,res)=>{
    const id = req.params.id
    const user = await User.findById(id)
    res.status(200).json({
        ok:true,
        user
    })
}
exports.createUser = async(req,res)=>{
    /*role*/
    const {username,email,password } = req.body
    
    const userSchema = new User({
        username,
        email,
        password
    })
    const userSaved = await userSchema.save()
    res.status(201).json({
        ok:true,
        message:'created successful by admin',
        userSaved
    })
}


exports.updateUser = async(req,res)=>{
    const id = req.params.id
    const userUpdated = await User.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json({
        ok:true,
        message:'updated successful by admin',
        userUpdated
    })
}

exports.deleteUser = async(req,res)=>{
    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    res.status(204).json({
        ok:true,
        message:'deleted successful by admin'
    })
}