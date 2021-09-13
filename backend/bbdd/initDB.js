require('dotenv').config();
const faker = require('faker/locale/es');
const getDB = require('./db');

const {
	getRandomValue,
	getRandomThems,
	getRandomImg,
	randomPhoto,
} = require('../helpers');

let connection;

const main = async () => {
	try {
		connection = await getDB();

		//SET FOREIGN_KEY_CHECKS = 1;

		//eliminamos tablas
		await connection.query('DROP TABLE IF EXISTS entries_ratings');
		await connection.query('DROP TABLE IF EXISTS entries_coments');
		await connection.query('DROP TABLE IF EXISTS entries_reports');
		await connection.query('DROP TABLE IF EXISTS photos');
		await connection.query('DROP TABLE IF EXISTS entries');
		await connection.query('DROP TABLE IF EXISTS users');

		console.log('Tablas eliminadas');

		//creacion tabla usuarios
		await connection.query(`
            CREATE TABLE users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userName VARCHAR(60) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(512) NOT NULL,
                biografia TEXT,
                avatar VARCHAR(600),
                firstName VARCHAR(50),
                lastName VARCHAR(60),
                address VARCHAR(150),
                cp VARCHAR(15),
                country VARCHAR(50),
                active BOOLEAN DEFAULT false,
                deleted BOOLEAN DEFAULT false,
                role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
                registrationCode VARCHAR(400),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME,
                recoverCode VARCHAR(100)
                
            );
        `);

		//creacion tabla noticias
		await connection.query(`
            CREATE TABLE entries (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                place VARCHAR(100) NOT NULL,
                title VARCHAR(50) NOT NULL,
                theme ENUM("science", "culture", "leisure", "political", "technology", "sports"),
                lead TEXT,
                description TEXT,
                views SMALLINT,
                photo VARCHAR(600),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id)
                ON DELETE CASCADE
            );
        `);

		//tabla de fotos
		await connection.query(`
             CREATE TABLE photos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                photo VARCHAR(600),
                createdAt DATETIME NOT NULL,
                idEntry INT UNSIGNED NOT NULL,
                FOREIGN KEY (idEntry) REFERENCES entries(id)
                ON DELETE CASCADE
             );
        `);

		//Tabla comentarios
		await connection.query(`
            CREATE TABLE entries_coments (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                coment TEXT,
                createdAt DATETIME NOT NULL,
                idEntry INT UNSIGNED NOT NULL,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idEntry) REFERENCES entries(id),
                FOREIGN KEY (idUser) REFERENCES users(id)
                ON DELETE CASCADE
            );
        `);

		//Tabla valoraciones
		await connection.query(`
            CREATE TABLE entries_ratings (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                vote BOOLEAN DEFAULT TRUE,
                createdAt DATETIME NOT NULL,
                idEntry INT UNSIGNED NOT NULL,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idEntry) REFERENCES entries(id),
                FOREIGN KEY (idUser) REFERENCES users(id)
                ON DELETE CASCADE
            );
        `);

		//Tabla reportes
		await connection.query(`
            CREATE TABLE entries_reports (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                report TEXT NOT NULL,
                createdAt DATETIME NOT NULL,
                idEntry INT UNSIGNED NOT NULL,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idEntry) REFERENCES entries(id),
                FOREIGN KEY (idUser) REFERENCES users(id)
                ON DELETE CASCADE
            );
        `);
		console.log('Tablas creadas');

		//admin
		await connection.query(
			`
                INSERT INTO users(createdAt, email, password, userName, biografia,  active, role)
                VALUES (
                     ?,
                     "pevv2001@hotmail.com", 
                     SHA2("${process.env.ADMIN_PASSWORD}", 512), 
                     "Paty",
                     "Yo soy la creadora",
                     true,
                     "admin"
                ),
                (
                    ?,
                     "estel@YOPmail.com", 
                     SHA2("${process.env.ADMIN_PASSWORD1}", 512), 
                     "Estel",
                     "Ella es mi secuaz",
                     true,
                     "admin"
                )
        `,
			[new Date(), new Date()]
		);

		console.log('Usuarios administradores creados');

		const now = new Date();
		//faker users inserts
		const users = 20;

		for (let i = 0; i < users; i++) {
			const email = faker.internet.email();
			const password = faker.internet.password();
			const userName = faker.name.findName();
			const biografia = faker.lorem.lines(3);

			await connection.query(
				`
                INSERT INTO users(createdAt, email, password, userName, biografia, active)
                VALUES (?, "${email}", SHA2("${password}", 512), "${userName}","${biografia}", true) 
            `,
				[now]
			);
		}
		console.log('Usuarios insertados');

		//faker entries
		const entries = 10;

		for (let i = 0; i < entries; i++) {
			const place = faker.address.city();
			const title = faker.lorem.words(4);
			const theme = getRandomThems();
			const lead = faker.lorem.lines(3);
			const description = faker.lorem.paragraphs(4);
			const idUser = getRandomValue(3, users + 2);
			const photo = randomPhoto();

			const [result] = await connection.query(
				`
            INSERT INTO entries(createdAt, place, title, theme, lead, photo, description, idUser)
            VALUES (?, "${place}", "${title}","${theme}", "${lead}", "${photo}", "${description}", "${idUser}");
            `,
				[now]
			);

			await connection.query(
				`
            INSERT INTO photos (photo, idEntry, createdAt) VALUES ("${photo}", ?, ?);
            `,
				[result.insertId, new Date()]
			);
		}

		console.log('Entradas creadas');
		console.log(new Date());

		//SET FOREIGN_KEY_CHECKS = 0;
	} catch (error) {
		console.error(error);
	} finally {
		if (connection) connection.release();
		process.exit(0);
	}
};
main();
