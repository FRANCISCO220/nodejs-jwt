const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/jwt',{
    useNewUrlParser:true
})

    .then(() => console.log('db is connected'))
    .catch(err =>console.log(err))