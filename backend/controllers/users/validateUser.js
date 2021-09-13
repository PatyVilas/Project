const getDB = require('../../bbdd/db');
//const { validate } = require('../../helpers');
//const { validateUserSchema } = require('../../schemes/index');

const validateUser = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(validateUserSchema, req.params);

        const { registrationCode } = req.params;

        console.log(" pruebas", registrationCode);
        const [user] = await connection.query(`
            SELECT id FROM users WHERE registrationCode = ?
        `, [registrationCode]);

        
        if (user.length < 1) {
            const error = new Error('No hay usuarios pendientes de validar con este codigo');
            error.httpStatus = 400;
            throw error;
        };

        await connection.query(`
            UPDATE users SET active = true, registrationCode = NULL WHERE registrationCode = ?
        `, [registrationCode]);
        

        res.send({
            status: 'ok',
            message: 'Usuario verificado.'
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = validateUser;