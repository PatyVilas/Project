const getDB = require("../../bbdd/db");
const { deletePhoto } = require("../../helpers");
//const { deleteEntryPhotoScheme } = require("../../schemes/index");


const deleteEntryPhoto = async(req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //await validate(deleteEntryPhotoScheme, req.params);

        const { idEntry, idPhoto } = req.params;

        const [photoInfo] = await connection.query(`
            SELECT photo FROM photos WHERE id = ? AND idEntry = ?;
        `, [idPhoto, idEntry]);

        if (photoInfo < 1) {
            const error = new Error('La foto seleccionada no existe');
            error.httpStatus = 404;
            throw error;
        }

        await deletePhoto(photoInfo[0].photo);

        await connection.query(`
            DELETE FROM photos WHERE id = ? AND idEntry = ?;
        `, [idPhoto, idEntry]);

        res.send({
            status: 'ok',
            message: 'La foto ha sido eliminada',
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = deleteEntryPhoto;