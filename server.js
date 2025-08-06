
const bodyParser = require("body-parser")

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
dotenv.config();
// cors gave me problems last time, this time I'll make sure it works.
const cors = require('cors'); 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const bakuganRoutes = require('./routes/bakugan');
const gateRoutes = require('./routes/gate')
const coreRoutes = require('./routes/core')
const deckRoutes = require('./routes/deck')
app.use('/bakugan', bakuganRoutes);
app.use('/gate', gateRoutes);
app.use('/core', coreRoutes);
app.use('/deck', deckRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))

  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept, Z-Key, Authorization"
    )
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    )
    next()
  })
  .use(cors({methods: ["GET","POST","DELETE","UPDATE","PUT","PATCH"]}))
  .use(cors({origin: "*"}))
  .use("/", require("./routes/index.js"))

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'));

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}), 
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running');
    });
  })
  .catch((err) => console.error(err));
