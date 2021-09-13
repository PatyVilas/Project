const getDB = require('../../bbdd/db');
const { generateRandomString, sendMail, formatDate, savePhoto } = require('../../helpers');
//const { newUserSchema } = require('../../schemes/index');

const newUser = async(req, res, next) => {
    let connection;

    const now = new Date();

    try {
        connection = await getDB();

        //await validate(newUserSchema, req.body);

        const {
			userName,
			email,
			password,
			firstName,
			lastName,
			address,
			cp,
			country,
		} = req.body;
		const [user] = await connection.query(
			`
            SELECT id FROM users WHERE email = ?
        `,
			[email]
		);

		if (user.length > 0) {
			const error = new Error(
				'El email indicado ya existe en la base de datos'
			);
			error.httpStatus = 400;
			throw error;
		}

		const registrationCode = generateRandomString(40);

		const emailBody = `
            Te acabas de registrar en HackNews.
            Pulsa en el link para verificar tu cuenta: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

		await sendMail({
			to: email,
			subject: 'Activa tu cuenta haciendo click en el enlace',
			body: emailBody,
		});

		await connection.query(
			`
            INSERT INTO users (userName, email, password, firstName, lastName, address, cp, country, registrationCode, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, SHA2(?, 512), ?);
        `,
			[
				userName,
				email,
				password,
				firstName,
				lastName,
				address,
				cp,
				country,
				registrationCode,
				formatDate(now),
			]
		);

        
        res.send({
            status: 'ok',
            data: 'Usuario registrado, comprueba tu correo para activarlo. Recuerda revisar también la bandeja de spam.'
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;