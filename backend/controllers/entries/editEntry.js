const getDB = require('../../bbdd/db');
const { formatDate } = require('../../helpers');
//const { editEntrySchema } = require('../../schemes');

const editEntry = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(editEntrySchema, req.params);

        const { idEntry } = req.params;
        let { place, title, theme, lead, description } = req.body;

        if (!place && !title && !theme && !lead && !description) {
            const error = new Error('Faltan campos de la noticia');
            error.httpStatus = 400;
            throw error;
        }

        const [entry] = await connection.query(
			`
            SELECT place, title, theme, lead, description FROM entries WHERE id = ?
        `,
			[idEntry]
		);

        place = place || entry[0].place;
        title = title || entry[0].title;
        theme = theme || entry[0].theme;
        lead = lead || entry[0].lead;
        description = description || entry[0].description;

        const now = new Date();

        await connection.query(`
            UPDATE entries SET place = ?, title = ?, theme = ?, lead = ?, description = ?, modifiedAt = ? WHERE id = ?;
        `, [place, title, theme, lead, description, formatDate(now), idEntry]);

        res.send({
            status: 'ok',
            data: {
                id: idEntry,
                place,
                title,
                theme,
                lead,
                description,
                modifiedAt: now,
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = editEntry;