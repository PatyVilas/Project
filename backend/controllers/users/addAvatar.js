const getDB = require('../../bbdd/db');
const { savePhoto } = require('../../helpers');


const addAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.userAuth;

		if (req.files && req.files.avatar) {
			const avatar = await savePhoto(req.files.avatar);
			await connection.query(
				`
                UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?;
            `,
				[avatar, new Date(), idUser]
			);

			res.send({
				status: 'ok',
				data: {
					avatar,
				},
			});
		} else {
			throw new Error('No se subió ninguna imagen');
		}
        
        
        
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = addAvatar;