const express = require("express"); //Import express
const db = require('./config/connection'); //Requiring connection file
const routes = require('./routes'); //Importing routes

const PORT = process.env.PORT || 3001; //Standard PORT (Also works with Heroku)
const app = express(); //Using express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});