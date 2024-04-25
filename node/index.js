const express = require('express')
const app = express()
app.set('view engine', 'ejs')
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
var sqlselect = "SELECT name FROM people"

app.get('/', (req,res) => {
    send_query()
    selectQuery(sqlselect, res)
})

app.listen(port, ()=>{
    console.log('Rodando na porta '+port)
})

function build_sql(value = fancy_name()) {
    sql = `INSERT INTO people(name) values('`+ value +`')`
    return sql
}

function send_query(query = build_sql()) {
    connection.query(query)
}

function selectQuery(query, res) {
    connection.query(query, function (err, rows) {
        if (err) {
          res.render('profile', { data: '' })
        } else {
          res.render('profile', { data: rows })
        }
      })
}

function fancy_name(){
    var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
    "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
    "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
    "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
    "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless"]
  
    , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
    "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
    "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
    "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
    "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
    "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
    "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
    "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star"];
  
    return adjs[Math.floor(Math.random()*(adjs.length-1))]+"_"+nouns[Math.floor(Math.random()*(nouns.length-1))];
  }