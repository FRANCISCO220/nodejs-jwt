const {Schema,model} = require('mongoose')

const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    roles:[{
        ref:'Role',
        type: Schema.Types.ObjectId
    }]
},{
    timestamps:true
    })


userSchema.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt)
}


userSchema.methods.validatePassword = function async(password){
    return bcrypt.compare(password,this.password)
}

module.exports = model('User', userSchema)