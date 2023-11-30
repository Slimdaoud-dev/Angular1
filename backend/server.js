const express = require('express')

const cors = require('cors')
const articleApi = require('./routes/article')
const authorApi = require('./routes/author')
require('./config/connect');


const app = express()
app.use(express.json())
app.use(cors())
app.use('/getimage',express.static('./upload'))
app.use('/article',articleApi);
app.use('/author',authorApi);

app.listen(3000,()=>{
    console.log("server work")
})