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

const create = `
BEGIN TRANSACTION
IF (SELECT COUNT(ТАБН) FROM dbo.ЛИЧНКАРТ WHERE ТАБН = @empid) = 0
	BEGIN
		INSERT INTO [ЛИЧНКАРТ]
		([ТАБН], [ДАТА], [ИНН], [ПЕНССТРАХ], [ВИД], [ПОЛ])
		VALUES(@empid, @date, @itn, @penssave,@type,@sex);

		INSERT INTO 
			[ЛИЧНОКАРТ I Общие сведения] 
			([ТАБН], [ФИО], [ДАТАРОЖД], [МЕСТОРОЖДЕНИЯ], [ГРАЖДАНСТВО], [ПРОФЕССИЯОсн], [ПРОФЕССИЯДоп],
			[БРАК], [ПАСПОРТСерНом], [ПАСПОРТДата], [ПАСПОРТВыдан], [АДРЕСПаспорт], [АДРЕСФАКТ], ДАТАРЕГИСТР, ТЕЛ)
		VALUES(@empid, @fio, @birthdate, @birthplace, @civ, @profmain, @profdop, @marriage, @passsernum, @passdate,
				@ufms, @adpass, @adfact, @regdate, @tel
		);
	END;
ELSE
	BEGIN
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
	END;
COMMIT TRANSACTION;
`;
module.exports = {perscard, geninfo, combineText, put, create};