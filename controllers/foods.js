const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get("/", async(req, res)=>{
    res.send("This the Homepage!")
})


module.exports = router;
