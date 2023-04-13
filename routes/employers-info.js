const express = require('express');
const sqlConfig = require('../sql/connection');
const sql = require('mssql');
const sqlTexts = require('./employers-info-sql');
let router = express.Router();

/* GET employers listing. */
router.get('/', function(req, res) {
    (async ()=>{
        try{
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.getAll;
            let result = await pool.request().query(text);
            res.json(result.recordset);
        } catch (err) {
            console.log(err);
        }
    })()

    sql.on('error', err => {
        console.log(err);
        res.render(err);
    });
});


/* GET emp's salart */
router.get('/salary/:emp', function(req, res){
    const empId = req.params.emp;
    const empInfo = {
        id: null,
        name: '',
        presalary: 0,
        surcharges: 0,
        salary: 0,
    };
    /* try to get presalary */
    (async ()=>{
        try{
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.getPreSalary;
            let result = await pool.request()
                .input('empId', sql.NVarChar(50), empId)
                .query(text);
            
            if (result.recordset.length > 0){
                let index = [];
                // build the index for json
                for (var x in result.recordset[0]) {
                    index.push(x);
                }
                empInfo.id = result.recordset[0][index[0]];
                empInfo.name = result.recordset[0][index[1]];
                empInfo.presalary = result.recordset[0][index[7]];
                
                try{
                    text = sqlTexts.getSurcharges;
                    result = await pool.request()
                        .input('empId', sql.NVarChar(50), empId)
                        .query(text);
                    if (result.recordset.length > 0){
                        let index = [];
                        // build the index for json
                        for (let x in result.recordset[0]) {
                            index.push(x);
                        }
                        empInfo.surcharges = result.recordset[0][index[2]];
                    }
                }
                catch(err) {
                    console.log(err);
                }
                empInfo.salary = empInfo.presalary + empInfo.surcharges;
                res.json(empInfo);
            }
            else{
                res.json({id: -1, message: "Сотрудник не найден!"});
            }
        } catch (err) {
            console.log(err);
        }
    })()
    sql.on('error', err => {
        console.log(err);
    });
    
});

/* GET emp's presalary */
router.get('/presalary/:emp', function(req, res){
    const empId = req.params.emp;
    const empInfo = {
        id: null,
        name: '',
        presalary: 0,
        surcharges: 0,
        salary: 0,
    };
    /* try to get presalary */
    (async ()=>{
        try{
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.getPreSalary;
            let result = await pool.request()
                .input('empId', sql.NVarChar(50), empId)
                .query(text);
            
            if (result.recordset.length > 0){
                let index = [];
                // build the index for json
                for (var x in result.recordset[0]) {
                    index.push(x);
                }
                empInfo.id = result.recordset[0][index[0]];
                empInfo.name = result.recordset[0][index[1]];
                empInfo.presalary = result.recordset[0][index[7]];
    
                res.json(empInfo);
            }
            else{
                res.json({id: -1, message: "Сотрудник не найден!"});
            }


        } catch (err) {
            console.log(err);
        }
    })()
    sql.on('error', err => {
        console.log(err);
    });
    
});

/* GET emp's surcharge sum */
router.get('/surcharge-sum/:emp', function(req, res){
    const empId = req.params.emp;
    const empInfo = {
        id: null,
        name: '',
        presalary: 0,
        surcharges: 0,
        salary: 0,
    };
    /* try to get surcharges */
    (async ()=>{
        try{
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.getSurcharges;
            let result = await pool.request()
                .input('empId', sql.NVarChar(50), empId)
                .query(text);
            if (result.recordset.length > 0){
                let index = [];
                // build the index for json
                for (var x in result.recordset[0]) {
                    index.push(x);
                }
                empInfo.id = result.recordset[0][index[0]];
                empInfo.name = result.recordset[0][index[1]];
                empInfo.surcharges = result.recordset[0][index[2]];
    
                res.json(empInfo);
            }
            else{
                res.json({id: -1, message: "Сотрудник не найден!"});
            }
        } catch (err) {
            console.log(err);
        }
    })()
    sql.on('error', err => {
        console.log(err);
    })
    
});


/* GET surcharges */
router.get('/surcharge/:emp', function(req, res){
    const empId = req.params.emp;
    /* try to get surcharges */
    (async ()=>{
        try{
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.getSurchargesList;
            let result = await pool.request()
                .input('empId', sql.NVarChar(50), empId)
                .query(text);
            if (result.recordset.length > 0){
                res.json(result.recordset);
            }
            else{
                res.json({id: -1, message: "Сотрудник не найден!"});
            }
        }catch(err){
            console.log(err);
        }
    })()
    sql.on('error', err => {
        console.log(err);
    })
});



/* GET duties */
router.get('/duties/:emp', function(req, res){
    const empId = req.params.emp;
    /* try to get surcharges */
    (async ()=>{
        try{
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.getDutiesList;
            let result = await pool.request()
                .input('empId', sql.NVarChar(50), empId)
                .query(text);
            if (result.recordset.length > 0){
                console.log(result.recordset);
                res.json(result.recordset);
            }
            else{
                res.json({id: -1, message: "Сотрудник не найден!"});
            }
        }catch(err){
            console.log(err);
        }
    })()
    sql.on('error', err => {
        console.log(err);
    })
});


module.exports = router;