// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")
const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const User = require('./models/user.js')
const usersController = require('./controllers/users.js');

// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal
// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB OMAR")})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// =======================
// 4. ROUTES
// =======================

app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.get('/', async(req, res) => {
    res.render('index.ejs');
  }); 
app.use('/users/:userId/foods', foodsController);
app.use('/users', usersController);


// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
    console.log('Listening on port 3000');
    });