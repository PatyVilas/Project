const getDB = require('../../bbdd/db');
const { formatDate, deletePhoto, savePhoto } = require('../../helpers');
//const { editUserSchema } = require('../../schemes');

const editUser = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(editUserSchema, req.body);

        const { idUser } = req.params;
        const { userName, email, biografia } = req.body;


        if (req.userAuth.idUser !== Number(idUser)) {
            const error = new Error(
                'No tienes permisos para editar éste usuario'
            );
            error.httpStatus = 403;
            throw error;
        }


        if (!userName && !email && !biografia && !(req.files && req.files.avatar)) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }


        const [user] = await connection.query(
            `SELECT email, avatar FROM users WHERE id = ?`, [idUser]
        );


        const now = new Date();


        if (req.files && req.files.avatar) {
            if (user[0].avatar) {
                await deletePhoto(user[0].avatar);
            }
            const avatarName = await savePhoto(req.files.avatar);

            await connection.query(
                `UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?;`, [avatarName, formatDate(now), idUser]
            );
        }


        if (email && email !== user[0].email) {
            const [existingEmail] = await connection.query(
                `SELECT id FROM users WHERE email = ?;`, [email]
            );

            if (existingEmail.length > 0) {
                const error = new Error(
                    'Ya existe un usuario con el email proporcionado en la base de datos'
                );
                error.httpStatus = 409;
                throw error;
            }

            await connection.query(
                `UPDATE users SET email = ?, modifiedAt = ? WHERE id = ?`, [email, formatDate(now), idUser]
            );
        }


        if (userName && user[0].userName !== userName) {
            await connection.query(
                `UPDATE users SET userName = ?, modifiedAt = ? WHERE id = ?`, [userName, formatDate(now), idUser]
            );
        }

        if (biografia && user[0].biografia !== biografia) {
            await connection.query(`
                UPDATE users SET biografia = ?, modifiedAt = ? WHERE id = ?;
            `, [biografia, formatDate(now), idUser]);
        }

        if (firstName && user[0].firstName !== firstName) {
            await connection.query(`
                UPDATE users SET firstName = ?, modifiedAt = ? WHERE id = ?;
            `, [firstName, formatDate(now), idUser]);
        }

        if (lastName && user[0].lastName !== lastName) {
            await connection.query(`
                UPDATE users SET lastName = ?, modifiedAt = ? WHERE id = ?;
            `, [lastName, formatDate(now), idUser]);
        }

        if (address && user[0].address !== address) {
            await connection.query(`
                UPDATE users SET address = ?, modifiedAt = ? WHERE id = ?;
            `, [address, formatDate(now), idUser]);
        }
        
        if (cp && user[0].cp !== cp) {
            await connection.query(`
                UPDATE users SET cp = ?, modifiedAt = ? WHERE id = ?;
            `, [cp, formatDate(now), idUser]);
        }

        if (country && user[0].country !== country) {
            await connection.query(`
                UPDATE users SET country = ?, modifiedAt = ? WHERE id = ?;
            `, [country, formatDate(now), idUser]);
        }
            

        res.send({
            status: 'ok',
            message: 'Datos de usuario actualizados',
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUser;