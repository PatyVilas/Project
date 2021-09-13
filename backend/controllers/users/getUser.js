const getDB = require('../../bbdd/db');
//const { validate } = require('../../helpers');
//const { getUserSchema } = require('../../schemes/index');


const getUser = async(req, res, next) => {

    let connection;

    try {
        connection = await getDB();

        //await validate(getUserSchema, req.params);

        const { idUser } = req.params;
        

        const [user] = await connection.query(`
            SELECT id, userName, email, avatar, firstName, lastName, address, cp, country, biografia, role, createdAt FROM users WHERE id = ?
        `, [idUser]);

        const userInfo = {
            idUser: user[0].id,
            userName: user[0].userName,
            avatar: user[0].avatar,
        };

        if (user[0].id === req.userAuth.idUser || req.userAuth.role === 'admin') {
            userInfo.email = user[0].email;
            userInfo.role = user[0].role;
            userInfo.biografia = user[0].biografia;
            userInfo.createdAt = user[0].createdAt;
            userInfo.firstName = user[0].firstName;
            userInfo.lastName = user[0].lastName;
            userInfo.address = user[0].address;
            userInfo.cp = user[0].cp;
            userInfo.country = user[0].cpuntry;

        };

        const [news] = await connection.query(
			`SELECT entries.*, photos.photo FROM entries LEFT JOIN photos ON photos.idEntry=entries.id WHERE idUser=?`,
			[idUser]
		);

        res.send({
            status: 'ok',
            data: {
                ...userInfo,
                entries: news
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;