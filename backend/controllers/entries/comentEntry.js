const getDB = require("../../bbdd/db");
const { formatDate } = require("../../helpers");
//const { comentEntrySchema } = require("../../schemes");


const comentEntry = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(comentEntrySchema, req.body);
        //await validate(comentEntrySchema, req.userAuth);
        //await validate(comentEntrySchema, req.params);

        const { idEntry } = req.params;
        const { idUser } = req.userAuth;
        const { coment } = req.body;
        //const coment =  {}
        if (!coment || !idUser) {
            const error = new Error('Faltan datos por cubrir');
            error.httpStatus = 400;
            throw error;
        }

        const [owner] = await connection.query(`
            SELECT idUser FROM entries WHERE id = ?;
        `, [idEntry]);
        if (owner[0].idUser === idUser) {
            const error = new Error('No puedes comentar tu propia noticia');
            error.httpStatus = 403;
            throw error;
        }

        const [alreadyComent] = await connection.query(`
            SELECT id FROM entries_coments WHERE idUser = ? AND idEntry = ?;
        `, [idUser, idEntry]);
        if (alreadyComent > 0) {
            const error = new Error('Solo puedes comentar una vez la noticia');
            error.httpStatus = 403;
            throw error;
        }

        const now = new Date();
        await connection.query(`
            INSERT INTO entries_coments (createdAt, coment, idUser, idEntry) VALUES (?, ?, ?, ?);
        `, [formatDate(now), coment, idUser, idEntry]);

        res.send({
            status: 'ok',
            data: {
                id: idEntry,
                idUser,
                coment,
                createdAt: now,
            },
        });


    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = comentEntry;