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
	role ENUM('admin', 'normal') DEFAULT "normal" NOT NULL,
	registrationCode VARCHAR(400),
	createdAt DATETIME NOT NULL,
	modifiedAt DATETIME,
	recoverCode VARCHAR(100)
	
);
        
CREATE TABLE entries (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	place VARCHAR(100) NOT NULL,
	title VARCHAR(50) NOT NULL,
	theme ENUM('science', 'culture', 'leisure', 'political', 'technology', 'sports'),
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
       
CREATE TABLE photos (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
photo VARCHAR(600),
createdAt DATETIME NOT NULL,
idEntry INT UNSIGNED NOT NULL,
FOREIGN KEY (idEntry) REFERENCES entries(id)
ON DELETE CASCADE
);

		
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

