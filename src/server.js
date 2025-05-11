require('dotenv').config()
const express = require('express')
const path = require('path')
const apiRoutes = require('./routes/api')
const connection = require('./config/database')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8080
const host = process.env.HOST_NAME || 'localhost'

//config template engine
// configViewEngine(app);

//cors config
app.use(cors({
    origin: 'http://localhost:3000',
}));

//config static files
app.use(express.static(path.join(__dirname, '../public')))

//parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//routes
// app.use('/', router);
app.use('/v1/api', apiRoutes);

(async () => {
    try {
        await connection();
        app.listen(port, host, () => {
            console.log(`Example app listening on port ${host}:${port}`)
        })
    } catch (error) {
        console.error('Error:', error);
    }
})();