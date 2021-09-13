const getDB = require("../../bbdd/db");
const { deletePhoto } = require("../../helpers");
//const { deleteEntrySchema } = require("../../schemes");


const deleteEntry = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(deleteEntrySchema, req.params);

        const { idEntry } = req.params;

        const [photos] = await connection.query(`
            SELECT photo FROM photos WHERE id = ?;
        `, [idEntry]);
        for (const photoInfo of photos) {
            await deletePhoto(photoInfo.photo);
        };

        await connection.query(
			`
            DELETE FROM photos WHERE idEntry = ?;
        `,
			[idEntry]
		);

		await connection.query(
			`
            DELETE FROM entries_ratings WHERE idEntry = ?;
        `,
			[idEntry]
		);

		await connection.query(
			`
            DELETE FROM entries_coments WHERE idEntry = ?;
        `,
			[idEntry]
		);

		await connection.query(
			`
            DELETE FROM entries_reports WHERE idEntry = ?;
        `,
			[idEntry]
		);

        await connection.query(`
            DELETE FROM entries WHERE id = ?;
        `, [idEntry]);


        res.send({
            statu: 'ok',
            message: `La noticia con id ${idEntry} ha sido eliminada`,
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}


module.exports = deleteEntry;