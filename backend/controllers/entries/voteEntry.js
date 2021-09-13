const getDB = require('../../bbdd/db');
const { formatDate, validate } = require('../../helpers');
//const { voteEntrySchema } = require('../../schemes/index');


const voteEntry = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(voteEntrySchema, req.userAuth);
        //await validate(voteEntrySchema, req.params);
        //await validate(voteEntrySchema, req.body);

        const { idUser } = req.userAuth;
        const { idEntry } = req.params;
        const { vote } = req.body;
        const validVotes = [-1, 1];

		if (!validVotes.includes(vote)) {
			const error = new Error('El voto debe ser 1 o -1');
			error.httpStatus = 400;
			throw error;
		}

        const [owner] = await connection.query(`
            SELECT idUser FROM entries WHERE id = ?;
        `, [idEntry]);
        if (owner[0].idUser === idUser) {
            const error = new Error('No puedes valorar tu propia noticia');
            error.httpStatus = 403;
            throw error;
        }

        const [alreadyVote] = await connection.query(`
            SELECT id FROM entries_ratings WHERE idUser = ? AND idEntry = ?
        `, [idUser, idEntry]);
        if (alreadyVote.length > 0) {
            const error = new Error('Ya has valorado la noticia anteriormente');
            error.httpStatus = 403;
            throw error;
        }

        await connection.query(`
            INSERT INTO entries_ratings (createdAt, vote, idUser, idEntry) VALUES (?, ?, ?, ?);
        `, [formatDate(new Date()), vote, idUser, idEntry]);

        const [newAvg] = await connection.query(`
            SELECT ROUND(AVG (entries_ratings.vote), 2) AS votes
            FROM entries_ratings
            WHERE entries_ratings.idEntry = ?;
        `, [idEntry]);

        res.send({
            status: 'ok',
            data: {
                vote: newAvg[0].vote,
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = voteEntry;