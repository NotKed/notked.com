const express = require('express');
const config = require('../config.json');
const { readdirSync } = require('fs');

let app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static( __dirname + '/views/public' ));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => { 
    console.log(`Started listening on port ${config.port}`);
    
    for(dir of readdirSync('./src/routes')) {
        require(`./routes/${dir}`)(app);
        console.log(`Express just loaded ${dir}`);
    }
 })