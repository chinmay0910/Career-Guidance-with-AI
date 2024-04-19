const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3300
const bodyParser = require('body-parser');

// Database Connection
// const connectToMongo = require('./db/db.js')
// connectToMongo();

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import all Routes
const routes = require('./routes/routes');

// handling static files 
app.use(express.static(path.join(process.cwd(), 'public')));

// handling ejs specific stuff
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})