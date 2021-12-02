const express = require('express');
const morgan = require('morgan')
const {createRoles} = require('./libs/initialSetup') 
const app = express();

require('./database')
createRoles()


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true }))

app.use(require('./routes/auth.routes'))
app.use(require('./routes/user.routes'))

app.listen(3000,()=>{
    console.log('server prendido en puerto',3000)
})