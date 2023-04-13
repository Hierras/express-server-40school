const express = require('express');
const sqlConfig = require('../sql/connection');
const sql = require('mssql');
const sqlTexts = require('./personal-card-sql');
const MyDate = require('../modules/date');
let router = express.Router();

/// ПОПРАВИТЬ ЗАПОЛНЕНИЕ ОБХЕКТА НИЖЕ!

let personsalCard = {
    code: true,
    main:{
        percode: null,
        date: null,
        itn: null,
        penssave: null,
        type: null,
        sex: null
    },
    persinfo:{
        name: null,
        date: null,
        birhplace: null,
        civ: null,
        mainprof: null,
        supprof: null,
        marriage: null
    }, 
    passport:{
        sernum: null,
        getdate: null,
        place: null,
        regaddress: null,
        factaddress: null,
        regdate: null,
        phone: null
    } 
}

/* GET Personal Card Content */
router.get('/:emp', function(req, res){
    (async ()=>{
        const empId = req.params.emp;
        try{     
            let pool = await sql.connect(sqlConfig);
            let text = sqlTexts.combineText;
            let result = await pool.request()
                .input('empId', sql.NVarChar(50), empId)
                .query(text);
            if (result.recordset.length > 0){
                let index = [];
                // build the index for json
                for (let x in result.recordset[0]) index.push(x);
                personsalCard.main.percode = result.recordset[0][index[0]][0];
                let j = 1;
                /* ЛИЧНАЯ КАРТА (main) */
                for(let elem in personsalCard.main){
                    if (personsalCard.main[elem] === personsalCard.main.percode) continue;
                    
                    if (MyDate.isDate(result.recordset[0][index[j]])){
                        personsalCard.main[elem] = MyDate.formatDateString(result.recordset[0][index[j++]]);
                    }
                    else{
                        personsalCard.main[elem] = result.recordset[0][index[j++]];
                    }
                       
                }
                j++; // miss login and perscode
                /* Общие сведения persinfo x passport */
                for(let elem in personsalCard.persinfo){
                    if (j === 15){
                        break;
                    }
                    if (MyDate.isDate(result.recordset[0][index[j]])){
                        personsalCard.persinfo[elem] = MyDate.formatDateString(result.recordset[0][index[j++]]);
                    }
                    else{
                        personsalCard.persinfo[elem] = result.recordset[0][index[j++]];
                    }
                }
                for(let elem in personsalCard.passport){
                    if (MyDate.isDate(result.recordset[0][index[j]])){
                        personsalCard.passport[elem] = MyDate.formatDateString(result.recordset[0][index[j++]]);
                    }
                    else{
                        personsalCard.passport[elem] = result.recordset[0][index[j++]];
                    }
                }
                personsalCard.code = true;
                res.json(personsalCard);
            }else{
                res.json({code: false});
            }
        }
        catch(err) {
            res.json({code: false});
        } 
    })()
    sql.on('error', err=>{
        res.json({code: false});
        console.log(err);
    });
});


/* PUT Personal Card Content */
router.put('/:emp', function(req, res){
    (async ()=>{
        const empId = req.params.emp;
        personsalCard = req.body;
        try{
            const  pool = await sql.connect(sqlConfig);
            const text = sqlTexts.put;
            const result = await pool.request()
                .input('empid', empId)
                .input('date', personsalCard.main.date)
                .input('itn', personsalCard.main.itn)
                .input('penssave', personsalCard.main.penssave)
                .input('type',personsalCard.main.type)
                .input('sex', personsalCard.main.sex)
                .input('fio', personsalCard.persinfo.name)
                .input('birthdate', personsalCard.persinfo.date)
                .input('birthplace', personsalCard.persinfo.birhplace)
                .input('civ', personsalCard.persinfo.civ)
                .input('profmain',personsalCard.persinfo.mainprof)
                .input('profdop',  personsalCard.persinfo.supprof)
                .input('marriage', personsalCard.persinfo.marriage)
                .input('passsernum', personsalCard.passport.sernum)
                .input('passdate', personsalCard.passport.getdate)
                .input('ufms', personsalCard.passport.place)
                .input('adpass', personsalCard.passport.regaddress)
                .input('adfact', personsalCard.passport.factaddress)
                .input('regdate', personsalCard.passport.regdate)
                .input('tel', personsalCard.passport.phone)
                .query(text)

            if (result.rowsAffected[0]){
                res.json({code: true});
            }
            else{
                res.json({code: false});
            }     
        }
        catch(err){
            console.log(err); 
            res.json({code: false});
        }
    })()
    sql.on('error', err=>{
        console.log(err);
        res.json({code: false});
    });
});

/* DELETE Personal Card Content */
router.delete('/:emp', function(req, res){
    (async ()=>{
        const empId = req.params.emp;
        personsalCard = req.body;
        const pool = await sql.connect(sqlConfig);
        try{
            /* Find employer */
        }
    })()
    sql.on('error', err=>{
        console.log(err);
    });
});

/* POST Personal Card Content */
router.post('/', function(req, res){
    (async ()=>{
        
    })()
    sql.on('error', err=>{
        console.log(err);
    });
});

module.exports = router;