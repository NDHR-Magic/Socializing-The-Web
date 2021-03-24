var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application

app.post('/profile', function (req, res, next) {
    console.log(req.body)
    res.json(req.body)
})