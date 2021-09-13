const getDB = require('../../bbdd/db');
//const { getEntrySchema } = require('../../schemes/index');
//const { validate } = require('../../helpers');

const getEntry = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(getEntrySchema, req.params);

        const { idEntry } = req.params;

        const [entry] = await connection.query(`
            SELECT entries.id, entries.place, entries.title, entries.theme, entries.lead, entries.description, entries.createdAt, entries.idUser, ROUND(AVG(IFNULL(entries_ratings.vote, 0)),2) AS votes
            FROM entries
            LEFT JOIN entries_ratings ON (entries.id = entries_ratings.idEntry)
            WHERE entries.id = ?;
        `, [idEntry]);

        const [photos] = await connection.query(`
            SELECT id, photo, createdAt FROM photos WHERE idEntry = ?
            `, [idEntry]);

        res.send({
            status: 'ok',
            data: {
                ...entry[0],
                photos,
            },
        });


    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = getEntry;