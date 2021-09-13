const getDB = require('../../bbdd/db');
const { generateRandomString, formatDate, deletePhoto } = require('../../helpers');
//const { deleteUserSchema } = require('../../schemes');

const deleteUser = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(deleteUserSchema, req.params);

        const { idUser } = req.params;

        if (Number(idUser) === 1) {
            const error = new Error('No se puede eliminar el usuario administrador')
            error.httpStatus = 403;
            throw error;
        };

        if (req.userAuth.idUser !== Number(idUser) && req.userAuth.role !== 'admin') {
            const error = new Error('No tienes permisos para eliminar éste usuario');
            error.httpStatus = 401;
            throw error;
        };

        const [user] = await connection.query(`
            SELECT avatar FROM users WHERE id = ?
        `, [idUser]);

        if (user[0].avatar) {
            await deletePhoto(user[0].avatar);
        };


        await connection.query(
            `
            UPDATE users SET password = NULL, userName ="[deleted]", avatar = NULL, firstName ="[deleted]", lastName ="[deleted]", address = "[deleted]", cp = "[deleted]", country ="[deleted]", active = 0, deleted = 1, modifiedAt = ? 
            WHERE id = ?  
        `,
            [generateRandomString(40), formatDate(new Date()), idUser]
        );

        res.send({
            status: 'ok',
            message: 'Usuario eliminado',
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    };
};

module.exports = deleteUser;