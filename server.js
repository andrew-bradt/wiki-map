// load .env data into process.env
require("dotenv").config({silent: true});

// Web server config
const PORT = process.env.PORT || 8080;
const {GOOGLE_MAPS_API_KEY} = process.env;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const db = require('./lib/db.js');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: ['some_secret_phrase']
}));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const markersRoutes = require('./routes/markers');
const mapsRoutes = require('./routes/map');
const loginRoute = require('./routes/login');
const profilesRoutes = require('./routes/profiles');
const setFavorite = require('./routes/favorites');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use('/api/markers', markersRoutes(db));
app.use('/api/map', mapsRoutes(db));
app.use('/api/profiles', profilesRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use('/favorites', setFavorite(db));
app.use('/login', loginRoute(db));
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const queryString = `SELECT name FROM users WHERE id = $1`;
  const queryParams = [req.session.user_id];

  if (req.session.user_id) {
    const templateVars = {GOOGLE_MAPS_API_KEY};
    return db.query(queryString, queryParams)
      .then(data => {
        templateVars.name = data.rows[0].name;
        return res.render("index", templateVars);
      });
  }
  return res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
