require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { formatDate } = require('./helpers');

const { PORT } = process.env;

//Todo Middlewares
const { entryExists, canEdit, userAuth, userExists } = require('./middlewares');

//Todo Controladores noticias
const {
	listEntries,
	getEntry,
	newEntry,
	addEntryPhoto,
	voteEntry,
	editEntry,
	deleteEntry,
	deleteEntryPhoto,
	comentEntry,
	reportEntry,
} = require('./controllers/entries');

//Todo Controladores usuarios
const {
	newUser,
	validateUser,
	getUser,
	loginUser,
	editUser,
	editPassword,
	recoverPass,
	deleteUser,
	resetUserPass,
	addAvatar,
	/* addAvatar, */
} = require('./controllers/users');

//ficheros estáticos
app.use(express.static('static'));
//logger
app.use(morgan('dev'));
//traduce el body y lo transforma en un objeto JS
app.use(express.json());
//leer body con formato form data
app.use(fileUpload());
app.use(cors());

//Todo peticiones
//NOTICIAS
//lista noticias
app.get('/entries', listEntries);
//noticia en concreto
app.get('/entries/:idEntry', entryExists, getEntry);
//nueva noticia
app.post('/entries', userAuth, newEntry);
//editar noticia
app.put('/entries/:idEntry', userAuth, entryExists, canEdit, editEntry);
//valorar una noticia
app.post('/entries/:idEntry/votes', userAuth, entryExists, voteEntry);
//comentar una noticia
app.post('/entries/:idEntry/coments', userAuth, entryExists, comentEntry);
//reportar una noticia
app.post('/entries/:idEntry/reports', userAuth, entryExists, reportEntry);
//borrar noticia
app.delete('/entries/:idEntry', userAuth, canEdit, entryExists, deleteEntry);
//añadir foto a noticia
app.post(
	'/entries/:idEntry/photos',
	userAuth,
	entryExists,
	canEdit,
	addEntryPhoto
);
//eliminar foto de noticia
app.delete(
	'/entries/:idEntry/photo/:idPhoto',
	userAuth,
	entryExists,
	canEdit,
	deleteEntryPhoto
);

//TODO USUARIOS
//nuevo usuario
app.post('/users', newUser);
//validar usuario
app.get('/users/validate/:registrationCode', validateUser);
//información de usuario
app.get('/users/:idUser', userAuth, userExists, getUser);
//login
app.post('/users/login', loginUser);
//editar usuario
app.put('/users/:idUser', userAuth, userExists, editUser);
//editar password
app.put('/users/:idUser/password', userAuth, userExists, editPassword);
//recuperar contraseña
app.put('/users/password/recover', recoverPass);
//resetear contaseña
app.put('/users/password/reset', resetUserPass);
//eliminar usuario
app.delete('/users/:idUser', userAuth, userExists, deleteUser);
//añadir avatar
app.post('/users/:idUser/avatar', userAuth, userExists, addAvatar);

app.use((error, req, res, next) => {
	const now = new Date();
	const time = formatDate(now);
	console.error(error, time);
	res.status(error.httpStatus || 500).send({
		status: 'error',
		message: error.message,
	});
});

app.use((req, res) => {
	res.status(404).send({
		status: 'error',
		message: 'Not Found',
	});
});

app.listen(PORT, () =>
	console.log(`Server listening at http://localhost:${PORT}`)
);
