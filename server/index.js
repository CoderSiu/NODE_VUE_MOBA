const express = require('express')
const app = express()

app.use(express.json())
app.use(require("cors")())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugin/db')(app)

app.listen(3000,()=> console.log('https://localhost:3000'))