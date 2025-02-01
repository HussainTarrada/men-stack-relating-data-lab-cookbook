const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async(req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const pantries = await currentUser.pantry
    res.render('foods/index.ejs', {pantries: pantries, currentUser: currentUser});
  });  

  router.get('/new', async(req, res) => {
    res.render('foods/new.ejs');
  });

router.post('/', async(req, res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.push(req.body)
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    }catch(error){
        console.log(error)
    
        res.redirect("/")
    }
  })

module.exports = router;
