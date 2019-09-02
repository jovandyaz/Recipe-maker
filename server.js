const express = require('express')
const app = express()
const request = require('request')
const path = require('path')
const port = process.env.SERVER_PORT || 3000

// Serving FILES
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
// Serving DATA
app.get('/teams/:teamName', (req, res) => {
    request(`http://data.nba.net/10s/prod/v1/2018/players.json`, function (error, response, body) {
        let reqData = JSON.parse(body)
        let teamReq = req.params //name: string
        console.log(`team: ${teamReq.teamName}`)
        let teamID = teamToIDs[teamReq.teamName] // number id: string
        console.log(`teamID: ${teamID}`)

        let playersT =
            reqData.league.standard
                .filter(t => t.teamId == teamID)
                .map(m => { return { Name: m.firstName, LastName: m.lastName, Jersey: m.jersey, Position: m.pos, Active: m.isActive } })
    
        playersT.forEach(i => {
            i.Img = `https://nba-players.herokuapp.com/players/${i.LastName}/${i.Name}`
        })
        console.log(playersT)
        res.send(playersT)

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

