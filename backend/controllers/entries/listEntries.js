const getDB = require('../../bbdd/db');
//const { validate } = require('../../helpers');
//const { listEntriesSchema } = require('../../schemes/index');

const listEntries = async(req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //await validate(listEntriesSchema, req.query);

        const { search, order, direction } = req.query;
        console.log(req.query);
        console.log(direction);

        const validOrderFiles = ['place', 'date', 'votes', 'theme', 'id', 'idUser', 'createdAt'];
        const validOrderDirection = ['DESC', 'ASC'];
        

        
        const orderBy = validOrderFiles.includes(order) ? order : 'votes';
        const orderDirection = validOrderDirection.includes(direction) ? direction : 'DESC';

        let results;

        if (search) {
            [results] = await connection.query(
                `
                SELECT entries.id, entries.place, photos.photo, entries.title, entries.theme, entries.lead, entries.description, entries.views, entries.createdAt, entries.modifiedAt, entries.idUser, ROUND(AVG(IFNULL(entries_ratings.vote, 0)),2) AS votes
                FROM entries
                LEFT JOIN entries_ratings ON (entries.id = entries_ratings.idEntry)
                LEFT JOIN photos ON entries.id = photos.idEntry
                WHERE entries.theme LIKE ? OR entries.idUser LIKE ?
                OR entries.title LIKE ? OR entries.description LIKE ?
                OR entries.id LIKE ? OR entries.place LIKE ?
                OR entries.lead LIKE ? OR entries.createdAt LIKE ?
                GROUP BY entries.id, photos.id
                ORDER BY ${orderBy} ${orderDirection};
            `,
                [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
            );

        } else {
            [results] = await connection.query(`
                SELECT entries.id, entries.place, photos.photo, entries.title, entries.theme, entries.lead, entries.description, entries.views, entries.createdAt, entries.modifiedAt, entries.idUser, ROUND(AVG(IFNULL(entries_ratings.vote, 0)),2) AS votes
                FROM entries
                LEFT JOIN entries_ratings ON (entries.id = entries_ratings.idEntry)
                 LEFT JOIN photos ON entries.id = photos.idEntry
                GROUP BY  entries.id,photos.id
                ORDER BY  ${orderBy} ${orderDirection};
            `);
        }

        res.send({
            status: 'ok',
            data: results,
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = listEntries;