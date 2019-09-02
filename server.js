const express = require('express')
const app = express()
const request = require('request')
const path = require('path')
const port = process.env.SERVER_PORT || 8080

// Serving FILES
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


// Serving DATA
app.get('/recipes/:ingredient', (req, res) => {
    let ingredientData = req.params.ingredient
    request(`https://recipes-goodness.herokuapp.com/recipes/${ingredientData}`, function (error, response, body) {
        let reqData = JSON.parse(body)
        console.log(reqData.results)
        console.log(ingredientData)
        res.send(reqData.results)

    })
})

// Server listening
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

