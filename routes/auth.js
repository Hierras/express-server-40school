const express = require('express');
const sqlConfig = require('../sql/connection');
const sql = require('mssql');
const jwtConfig = require('../token/config');
const router = express.Router();

/* GET for loading login and password */
router.get('/', function(req, res, next) {

    /* 
        requires access cheking
        ...
    */  
    (async () => {
        try {
            let pool = await sql.connect(sqlConfig)
            let result = await pool.request()
                //.input('input_parameter', sql.Int, value)
                .query('select * from dbo.Пароли')
                
            res.json(result.recordset);
        } catch (err) {
            console.log(err);
            res.render(err);
        }
    })()

    sql.on('error', err => {
        console.log(err);
        res.render(err);
    })
});
/* POST for checking login and password */
router.post('/', function(req, res) {
    const enteredLogin = req.body.login;
    const enteredPassword = req.body.password;

    (async () => {
        try {
            let pool = await sql.connect(sqlConfig)
            let result = await pool.request()
                .input('login', sql.NVarChar(50), enteredLogin)
                .input('password', sql.NVarChar(50), enteredPassword)
                .query('select * from dbo.Пароли where [Логин] = @login and [Пароль] = @password');
             
            if (result.recordset.length > 0){
                const token = jwtConfig.sign(
                    {
                        login: enteredLogin,
                        pass: enteredPassword
                    }
                );
                res.json({serverAnswer: true, token: token});
            }
            else{
                res.json({serverAnswer: false});
            }
            
        } catch (err) {
            console.log(err);
            res.render(err);
        }
    })()

    sql.on('error', err => {
        console.log(err);
        res.render(err);
    })
});

module.exports = router;