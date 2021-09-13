const getDB = require('../../bbdd/db');
const { savePhoto } = require('../../helpers');


const addAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;

        const [avatar] = await connection.query(`
            SELECT avatar FROM users WHERE id = ?;
        `, [idUser]);

        
        if (req.file && req.files.avatar) {
            avatar = await savePhoto(req.files.photo);
            await connection.query(`
                UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?;
            `, [avatar, new Date()]);
        }
        
        res.send({
            status: 'ok',
            data: {
                avatar,
            }
        })
        
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = addAvatar;