const getDB = require("../../bbdd/db");
const { formatDate } = require("../../helpers");
//const { reportEntrySchema } = require("../../schemes/index");


const reportEntry = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(reportEntrySchema, req.params);
        //await validate(reportEntrySchema, req.userAuth);
        //await validate(reportEntrySchema, req.body);

        const { idEntry } = req.params;
        const { idUser } = req.userAuth;
        const { report } = req.body;

        if (!report || !idUser) {
            const error = new Error('Faltan datos por cubrir');
            error.httpStatus = 400;
            throw error;
        }

        const [owner] = await connection.query(`
            SELECT idUser FROM entries WHERE id = ?;
        `, [idEntry]);
        if (owner[0].idUser === idUser) {
            const error = new Error('¿Quieres reportar tu propia noticia?');
            error.httpStatus = 403;
            throw error;
        }

        const [alreadyReport] = await connection.query(`
            SELECT id FROM entries_reports WHERE idUser = ? AND idEntry = ?;
        `, [idUser, idEntry]);
        if (alreadyReport > 0) {
            const error = new Error('Solo puedes reportar una vez la noticia');
            error.httpStatus = 403;
            throw error;
        }

        const now = new Date();
        await connection.query(`
            INSERT INTO entries_reports (createdAt, report, idUser, idEntry) VALUES (?, ?, ?, ?);
        `, [formatDate(now), report, idUser, idEntry]);

        res.send({
            status: 'ok',
            data: {
                id: idEntry,
                idUser,
                report,
                createdAt: now,
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = reportEntry;