const getDB = require('../../bbdd/db');
const { savePhoto } = require('../../helpers');
//const { addPhotoEntrySchema } = require('../../schemes/index');


const addEntryPhoto = async(req, res, next) => {
    let connection;

    
    try {
        connection = await getDB();
        
        //await validate(addPhotoEntrySchema, req.params);
        
        const { idEntry } = req.params;
  

        const [photo] = await connection.query(`
            SELECT id FROM photos WHERE idEntry = ?;
        `, [idEntry]);

        if (photo.length >= 3) {
            const error = new Error('Ya has asignado 3 fotos a esa entrada. No puedes subir más fotos');
            error.httpStatus = 403;
            throw error;
        }
        let photoName;
        if (req.files && req.files.photo) {
            photoName = await savePhoto(req.files.photo);
            await connection.query(`
                INSERT INTO photos (photo, idEntry, createdAt) VALUES (?, ?, ?)
            `, [photoName, idEntry, (new Date())]);
        }

        res.send({
            status: 'ok',
            data: {
                photo: photoName,
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = addEntryPhoto;