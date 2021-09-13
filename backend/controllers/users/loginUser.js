const getDB = require('../../bbdd/db');
const jwt = require('jsonwebtoken');
//const { validate } = require('../../helpers');
//const { loginUserSchema } = require('../../schemes/index');

const loginUser = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(loginUserSchema, req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Falta el email o la contraseña.');
            error.httpStatus = 400;
            throw error;
        };

        const [user] = await connection.query(`
            SELECT id, role, active, userName FROM users WHERE email = ? AND password = SHA2(?, 512) 
        `, [email, password]);

        if (user.length < 1) {
            const error = new Error('Email o contraseña incorrecto');
            error.httpStatus = 401;
            throw error;
        };

        if (!user[0].active) {
            const error = new Error('Usuario pendiente de activación');
            error.httpStatus = 401;
            throw error;
        };

        const userName = user[0].userName;
        const idUser = user[0].id;
            

        const tokenInfo = {
            idUser: user[0].id,
            role: user[0].role
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '30d'
        });

        res.send({
            status: 'ok',
            data: {
                token,
                idUser,
                userName,
            }
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;