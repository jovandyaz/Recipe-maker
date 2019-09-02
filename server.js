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

        // let recipes = 
        //     reqData.results
        //         .filter(i => i.)
    
        // let teamReq = req.params //name: string
        // console.log(`team: ${teamReq.teamName}`)
        // let teamID = teamToIDs[teamReq.teamName] // number id: string
        // console.log(`teamID: ${teamID}`)

        // let playersT =
        //     reqData.league.standard
        //         .filter(t => t.teamId == teamID)
        //         .map(m => { return { Name: m.firstName, LastName: m.lastName, Jersey: m.jersey, Position: m.pos, Active: m.isActive } })
    
        // playersT.forEach(i => {
        //     i.Img = `https://nba-players.herokuapp.com/players/${i.LastName}/${i.Name}`
        // })
        // console.log(playersT)
        // res.send(playersT)

    })

    // request(`https://nba-players.herokuapp.com/players-stats-teams/${req.params}`, function (error, response, body) {
    //     let reqData = JSON.parse(body)
    //     console.log(req.params)
    //     console.log(reqData.team_name)
    //     res.send(reqData)
    // })

})

// Server listening
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

