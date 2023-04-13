const express = require('express');
const jwtConfig = require('../token/config');
const router = express.Router();

/* Verification token */
router.post('/', (req, res)=>{
    if (req.body.token){
        const token = req.body.token;
        res.json(jwtConfig.verify(token));
    }
    else{
        res.json({error: "NoTokenInCoocki", code: 0, text:""});
    }
})

module.exports = router;