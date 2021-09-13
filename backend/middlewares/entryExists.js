const getDB = require('../bbdd/db');

const entryExists = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idEntry } = req.params;

        const [entry] = await connection.query(`
            SELECT id FROM entries WHERE id = ?;
        `, [idEntry]);

        if (entry.length < 1) {
            const error = new Error('La noticia no ha sido encontrada');
            error.httpStatus = 404;
            throw error;
        }
        next();

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = entryExists;