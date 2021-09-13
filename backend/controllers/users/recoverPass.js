const getDB = require('../../bbdd/db');
const { generateRandomString, sendMail } = require('../../helpers');
//const { recoverPassSchema } = require('../../schemes/index');

const recoverPass = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // await validate(recoverPassSchema, req.body);

        const { email } = req.body;

        if (!email) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        };


        const [user] = await connection.query(`
            SELECT id FROM users WHERE email = ?
        `, [email]);

        if (user.length < 1) {
            const error = new Error('No existe ningún usuario con ese email.')
            error.httpStatus = 404;
            throw error;
        };


        const recoverCode = generateRandomString(20);


        const emailBody = `
            Se solicitó un cambio de contraseña para el usuario registrado con este email.

            El código de recuperación es: ${recoverCode}.

            Si no has solicitado ningún cambio, por favor, ignora este email o ponte en contacto con el centro de ayuda.

            ¡Gracias!

        `;


        await sendMail({
            to: email,
            subject: 'Código de recuperación',
            body: emailBody,
        });

        await connection.query(`
            UPDATE users SET recoverCode = ? WHERE email = ?
        `, [recoverCode, email])

        res.send({
            status: 'ok',
            message: 'Email enviado'
        });

    } catch (error) {
        next(error);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = recoverPass;