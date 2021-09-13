const getDB = require('../../bbdd/db');
//const { newEntrySchema } = require('../../schemes/index');

const newEntry = async (req, res, next) => {
    let connection;

    const now = new Date();

    try {
        connection = await getDB();

        //await validate(newEntrySchema, req.body);

        const { idUser } = req.userAuth;
        const { place, title, theme, lead, description } = req.body;

        if (!place || !title || !theme || !lead || !description || !idUser) {
            const error = new Error('Faltan por cubrir campos de la noticia');
            error.httpStatus = 400;
            throw error;
        }

  
        const [newEntry] = await connection.query(
            `
            INSERT INTO entries (place, title, theme, lead, description, createdAt, idUser)
            VALUES ( ?, ?, ?, ?, ?, ?, ?);
        `,
            [place, title, theme, lead, description, now, idUser]
        );

        const { insertId: idEntry } = newEntry;

        res.send({
            status: 'ok',
            data: {
                id: idEntry,
                idUser,
                place,
                title,
                theme,
                lead,
                description,
                createdAt: now,
                votes: 0,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newEntry;
