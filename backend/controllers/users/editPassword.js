const getDB = require('../../bbdd/db');
const { formatDate } = require('../../helpers');
//const { editPasswordSchema } = require('../../schemes/index');

const editPassword = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(editPasswordSchema, req.body);

        const { idUser } = req.params;
        const { oldPassword, newPassword } = req.body;


        if (req.userAuth.idUser !== Number(idUser)) {
            const error = new Error('No tienes permisos para editar éste usuario.');
            error.httpStatus = 403;
            throw error;
        };


        if (newPassword.length < 8) {
            const error = new Error('La contraseña debe tener al menos 8 caracteres.');
            error.httpStatus = 400;
            throw error;
        }


        const [user] = await connection.query(`
            SELECT id FROM users WHERE id = ? AND password = SHA2(?, 512)
        `, [idUser, oldPassword]);

        if (user.length < 1) {
            const error = new Error('La contraseña no es correcta.');
            error.httpStatus = 401;
            throw error;
        };


        await connection.query(`
            UPDATE users SET password = SHA2(?, 512), modifiedAt = ? WHERE id = ?
        `, [newPassword, formatDate(new Date()), idUser])

        res.send({
            status: 'ok',
            message: 'La contraseña ha sido modificada.'
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editPassword;