const express = require('express');
const app = express();

require('./database')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(require('./routes/auth.routes'))

app.listen(3000,()=>{
    console.log('server prendido en puerto',3000)
})