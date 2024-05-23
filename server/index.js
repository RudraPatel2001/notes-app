require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/user.route')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000
const url = process.env.ATLAS_URI

mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected!')
    }).catch((err) => {
        console.log('MongoDB error: ' + err)
    })

app.get('/', (_, res) => {
    return res.json({
        name: 'Merit Services Task',
        status: 'Server is running!'
    })
})

app.use('/user', userRoutes)

app.listen(PORT, () => console.log("Server running on PORT: " + PORT))