const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config();

// MongoDB + Swagger
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});
app.use(cors({methods: ["GET","POST","DELETE","UPDATE","PUT","PATCH"]}));
app.use(cors({origin: "*"}));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 🟡 Important: Routes AFTER middleware setup
app.use("/", require("./routes/index.js"));
app.use('/bakugan', require('./routes/bakugan'));
app.use('/gate', require('./routes/gate'));
app.use('/core', require('./routes/core'));
app.use('/deck', require('./routes/deck'));

// Passport GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out');
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}), 
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running');
    });
  })
  .catch((err) => console.error(err));
