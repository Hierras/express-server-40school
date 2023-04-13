
function isDate(value){

    const re = /^\d{2}\.\d{2}\.\d{4} (\d{2}||\d):\d{2}:\d{2}$/;
    return re.test(value);  
}
function formatDateString(value){
    const day = value[0] + value[1];
    const month = value[3] + value[4];
    const year = value[6] + value[7] + value[8] + value[9];
    return `${year}-${month}-${day}`;
}
function formatDateSQL(str){
    const day = str[8] + str[9];
    const month = str[5] + str[6];
    const year = str[0] + str[1] + str[2] + str[3];
    return `${day}.${month}.${year}`;
}
module.exports = MyDate = {isDate, formatDateString, formatDateSQL};