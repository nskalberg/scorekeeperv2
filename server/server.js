const express = require("express");
const cors = require("cors");
const levenshtein = require("js-levenshtein")
const app = express();
const fs = require('fs');
const path = require("path");
const filepath = './data/data.json';
const titleDataPath = './data/csvjson.json'
const tokenData = './data/tokens.json'
const userData = './data/users.json'
const request = require('request');

app.use(cors());
app.use(express.json());

function generateToken(n) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for(var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

app.post("/api/authorize", async (req, res) => {
  const {token, user} = req.body
  const tokens = JSON.parse(fs.readFileSync(tokenData))

  for(t = 0; t < tokens.length; t++){
    if(token == tokens[t].token && user == tokens[t].user){
      if(tokens[t].expires > Math.floor(Date.now()/1000)){
        res.status(200)
        res.send({message: "Token valid"})
        return
      }
    }
  }

  res.status(401)
  res.send({message: "Token invalid"})

})

app.delete("/api/authorize", async (req, res) => {
  const {token, user} = req.body
  const tokens = JSON.parse(fs.readFileSync(tokenData))
  var index, result
  
  console.log(tokens)

  for(t = 0; t < tokens.length; t++){
    if(token == tokens[t].token && user == tokens[t].user){
      index = t
    }
  }
  
  if(tokens.length == 1){
    result = []
  } else {
    result = tokens.splice(index, 1)
  }

  fs.writeFileSync(tokenData, JSON.stringify(result, null, 4));
  res.send("Token deleted")
})

app.post("/api/login", async (req, res) => {
  const {username, password, token} = req.body

  const data =  JSON.parse(fs.readFileSync(userData))
  const tokens = JSON.parse(fs.readFileSync(tokenData))

  if(token){
    for(i = 0; i < tokens.length; i++){
      if(token == tokens[i].token){
        res.json(tokens[i])
        return;
      }
    }
    res.status(401)
    res.send("Token invalid")
    return
  }

  for(i = 0; i < data.length; i++){
    if(data[i].username == username && data[i].password == password){
      const token = generateToken(10)
      tokens.push({
        token: token,
        user: data[i].id,
        expires: Math.floor((Date.now()/1000)+86400)
      })
      fs.writeFileSync(tokenData, JSON.stringify(tokens, null, 4));
      res.json({
        id: data[i].id,
        token: token
      })
      return;
    }
  }

  const err = new Error("Invalid credentials")
  err.statusCode = 401
  throw err

})

app.post("/api/game", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath));

  var response = {}

  fetch(`http://adb.arcadeitalia.net/service_scraper.php?ajax=query_mame&game_name=${req.body.id}`)
    .then(res => res.json())
    .then(json => {
      json.result.map(game => {
        if(game.game_name == req.body.id){
          response.gameData = game
          res.json(response)
        }
      })
    })

})

app.post("/api/library", async (req, res) => {
  var result = []
  var response = []

  const data = JSON.parse(fs.readFileSync(filepath))
  data.map(row => {
    if(row.user == req.body.user){
      if(!result.includes(row.game)){
        result.push(row.game)
      }
    }
  })

  async function fetchData(game, index){
    var promise = new Promise((resolve, reject) => {
      fetch(`http://adb.arcadeitalia.net/service_scraper.php?ajax=query_mame&game_name=${game}`)
        .then(res => res.json())
        .then(json => resolve(json))
    })
    let result = await promise
    response[index] = result.result[0]
  }

  async function compileResult(games) {
    for(j = 0; j < games.length; j++){
      await fetchData(games[j], j)
    }
    res.json(response)
  }

  compileResult(result)

})

app.post("/api/search", (req, res) => {
  
  const result = []
  const titleData = JSON.parse(fs.readFileSync(titleDataPath));

  const scoredTitles = titleData.map(title => {
    return ({
      ...title,
      score: levenshtein(req.body.query, title.Description.toString().replace(/ *\([^)]*\) */g, ""))
    })
  })

  scoredTitles.sort((a, b) => parseFloat(a.score) - parseFloat(b.score))

  async function fetchData(title){
    return fetch(`http://adb.arcadeitalia.net/service_scraper.php?ajax=query_mame&game_name=${title.Roms}`)
      .then(response => response.json())
      .then(json => {
        json.result.map(data => {
          if(data.game_name == title.Roms && data.url_image_marquee != ""){
            console.log(data)
            result.push({
              ...title,
              manufacturer: data.manufacturer,
              decal: `http://adb.arcadeitalia.net/media/mame.current/decals/${data.game_name}.png?release=208`,
              year: data.year
            })
          }
        })
      })
  }

  async function compileResult(){
    for(i = 0; i < 10; i++){
      await fetchData(scoredTitles[i])
    }
      res.json(result)
  }
  compileResult()
})

app.use(express.static(path.join(__dirname, "..", "build")));

app.post("/api/score", (req, res) => {

  const data = JSON.parse(fs.readFileSync(filepath));
  const tokens = JSON.parse(fs.readFileSync(tokenData))

  // const { user, token } = req.body
  console.log(req.body)
  for(row in tokens){
    console.log(row)
    // if(tokens[row].token == token && tokens[row].user == user){
      data.push(req.body)
      fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
      res.json({ message: "Score uploaded successfully." });
      return
    // }
  }
  res.status(401)
  res.send({ message: "Not authorized"})
});

app.post("/api/scores", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath));
  const { user, game } = req.body

  const response = []

  //vs avg should be (1 - (score / avg score))

  for(row in data){
    console.log(data[row])
    if(user == data[row].user && game == data[row].game){
      response.push(data[row])
    }
  }

  res.json(response)
});

app.get('/api/image', async (req, res) => {
  console.log(req.query.game)
  const url = `http://adb.arcadeitalia.net/media/mame.current/decals/${req.query.game}.png`;

  request({
    url: url,
    encoding: null
  }, 
  (err, resp, buffer) => {
    if (!err && resp.statusCode === 200){
      res.set("Content-Type", "image/jpeg");
      res.send(resp.body);
    }
  });
});

var port = 3100;

app.listen(port, function() {
  console.log("Node app is running at localhost:" + port)
});