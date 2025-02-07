const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async(req, res) => {
    const users = await User.find()
    res.render('users/index.ejs', {users: users});
  });  

  router.get('/show/:itemId', async(req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const pantry = await currentUser.pantry
    res.render("users/show.ejs", {pantry: pantry})
  });  




module.exports = router;
