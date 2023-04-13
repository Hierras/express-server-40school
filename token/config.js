const jwt = require('jsonwebtoken');
const sercretKey = "kkdlwDFFQWET";

/* Token structure */
// decoded.login


function sign(payload){
    try{
        return jwt.sign(payload, sercretKey, { expiresIn: '8h', algorithm: 'HS256'});
    }
    catch(err)
    {
        return {error: err, code: 0};
    }
}
function verify(token){
    let result;
    try{
        const decoded = jwt.verify(token, sercretKey);
        if (decoded === undefined) result = {error: "Token undefined!", code: -4, text: ""};
        result = { login: decoded.login, code: 1, text:"" };
    }
    catch(err){
        if (err.name === "TokenExpiredError"){
            result = {
                error: err.message,
                code: -1,
                text: "Время сеанса иссякло!"
            };
        }
        // JsonWebTokenError
        else if (err.name === "JsonWebTokenError"){
            result = {
                error: err.message,
                code: -2,
                text: "Неверный токен!"
            };
        }
        // NotBeforeError
        else if (err.name === "NotBeforeError"){
            result ={error: err.message, code: -3, text: ""};
        } 
    }
    finally{
        return result;
    }
}
module.exports = {verify, sign};