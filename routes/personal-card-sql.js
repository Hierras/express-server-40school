const perscard = `SELECT * FROM [ЛИЧНКАРТ]`;
const geninfo = `SELECT * FROM [ЛИЧНОКАРТ I Общие сведения]`;
const combineText = `
    SELECT * 
    FROM
        [ЛИЧНКАРТ] INNER JOIN [ЛИЧНОКАРТ I Общие сведения]
             ON [ЛИЧНКАРТ].ТАБН = [ЛИЧНОКАРТ I Общие сведения].ТАБН
    WHERE 
        ([ЛИЧНКАРТ].ТАБН = @empId AND [ЛИЧНОКАРТ I Общие сведения].ТАБН = @empId)
        OR ([ЛИЧНОКАРТ I Общие сведения].ФИО = @empId);`;

const put = `
    BEGIN TRANSACTION
    
    UPDATE [ЛИЧНКАРТ]
    SET
        [ДАТА]=@date,
        [ИНН]=@itn,
        [ПЕНССТРАХ]=@penssave,
        [ВИД]=@type,
        [ПОЛ]=@sex
    WHERE [ТАБН]=@empid;

    UPDATE 
        [ЛИЧНОКАРТ I Общие сведения] 
    SET 
        [ФИО]=@fio,
        [ДАТАРОЖД]=@birthdate,
        [МЕСТОРОЖДЕНИЯ]=@birthplace,
        [ГРАЖДАНСТВО]=@civ,
        [ПРОФЕССИЯОсн]=@profmain,
        [ПРОФЕССИЯДоп]=@profdop,
        [БРАК]=@marriage,
        [ПАСПОРТСерНом]=@passsernum,
        [ПАСПОРТДата]=@passdate,
        [ПАСПОРТВыдан]=@ufms,
        [АДРЕСПаспорт]=@adpass,
        [АДРЕСФАКТ]=@adfact,
        [ДАТАРЕГИСТР]=@regdate,
        [ТЕЛ]=@tel
    WHERE [ТАБН]=@empid;

    COMMIT TRANSACTION
`;
module.exports = {perscard, geninfo, combineText, put};