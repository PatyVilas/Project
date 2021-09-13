const getDB = require("../bbdd/db");


const canEdit = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idEntry } = req.params;

        const [owner] = await connection.query(`
            SELECT idUser FROM entries WHERE id = ?;
        `, [idEntry]);
        if (owner[0].idUser !== req.userAuth.idUser && req.userAuth.role !== 'admin') {
            const error = new Error('No tienes permiso para editar ésta noticia');
            error.httpStatus = 401;
            throw error;
        }
        next();

    } catch (error) {
        next(error)
    } finally {
        if (connection) connection.release();
    }
}

module.exports = canEdit;