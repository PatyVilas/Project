require('dotenv').config();
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const { format } = require('date-fns');
const { ensureDir, unlink } = require('fs-extra');

const { UPLOADS_DIRECTORY } = process.env;
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Formatear fecha
function formatDate(date) {
	return format(date, 'yyyy-MM-dd HH:mm:ss');
}

//Tema aleatorio
function getRandomThems() {
	const words = [
		'science',
		'culture',
		'leisure',
		'political',
		'technology',
		'sports',
	];
	const result = Math.floor(Math.random() * 6);
	return words[result];
}

//Fotos random
function getRandomImg() {
	const searchs = [
		'food',
		'water',
		'history',
		'music',
		'film',
		'technology',
		'health',
		'arts',
		'nature',
		'flower',
		'happy',
		'love',
		'architecture',
		'fashion',
		'animals',
		'travel',
		'people',
		'random',
	];
	const result = Math.floor(Math.random() * 18);
	return searchs[result];
}

function randomPhoto() {
	const photos = [
		'arcadeMachines.jpg',
		'atWork.jpg',
		'babyYoda.jpg',
		'basket.jpg',
		'blackCamera.jpg',
		'bones.jpg',
		'books.jpg',
		'camera.jpg',
		'cameraLens.jpg',
		'chain.jpg',
		'childrenAndroid.jpg',
		'chips.jpg',
		'city.jpg',
		'cleverVisuals.jpg',
		'CloudGate.jpg',
		'code.jpg',
		'dice.jpg',
		'earth.jpg',
		'eolicoPark.jpg',
		'fibre.jpg',
		'fingerprint.jpg',
		'GameBoy.jpg',
		'GameBoyColor.jpg',
		'gamerZone.jpg',
		'greenNatur.jpg',
		'idea.jpg',
		'islands.jpg',
		'laptop.jpg',
		'lavender.jpg',
		'ligths.jpg',
		'dose.jpg',
		'Manhattan.jpg',
		'Mario.jpg',
		'meteorShower.jpg',
		'microescope.jpg',
		'casacade.jpg',
		'molecule.jpg',
		'monopoly.jpg',
		'motherboard.jpg',
		'mountainLandscape.jpg',
		'neonArcade.jpg',
		'neuron.jpg',
		'nightLights.jpg',
		'nintendo.jpg',
		'oldCamera.jpg',
		'oldPhotos.jpg',
		'oneWay.jpg',
		'Paris.jpg',
		'purple.jpg',
		'robot.jpg',
		'rocket.jpg',
		'satelite.jpg',
		'shift.jpg',
		'SpaceNeedle.jpg',
		'SwitchControllers.jpg',
		'taxis.jpg',
		'trees.jpg',
		'vintage.jpg',
		'virtualReality.jpg',
		'water.jpg',
		'work.jpg',
		'workZone.jpg',
	];
	const result = Math.floor(Math.random() * 62);
	return photos[result];
}

//Valor aleatorio
function getRandomValue(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

//Guardar imagen
async function savePhoto(imageData) {
	await ensureDir(uploadsDir);

	const image = sharp(imageData.data);

	const imageInfo = await image.metadata();

	const IMAGE_MAX_WIDTH = 1000;
	if (imageInfo.width > IMAGE_MAX_WIDTH) {
		image.resize(IMAGE_MAX_WIDTH);
	}

	const savedImageName = `${uuid.v4()}.jpg`;

	const imagePath = path.join(uploadsDir, savedImageName);

	await image.toFile(imagePath);

	return savedImageName;
}

//Borrar imagen
async function deletePhoto(photoName) {
	const photoPath = path.join(uploadsDir, photoName);
	await unlink(photoPath);
}

//Generador Random String
function generateRandomString(length) {
	return crypto.randomBytes(length).toString('hex');
}

//Enviar email
async function sendMail({ to, subject, body }) {
	try {
		const msg = {
			to,
			from: process.env.SENDGRID_FROM,
			subject,
			text: body,
			html: `
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>`,
		};
		await sgMail.send(msg);
	} catch (error) {
		throw new Error('Error enviando email');
	}
}

//Validar esquema
async function validate(schema, data) {
	try {
		await schema.validateAsync(data);
	} catch (error) {
		error.httpStatus = 400;
		throw error;
	}
}

module.exports = {
	formatDate,
	getRandomThems,
	getRandomImg,
	getRandomValue,
	randomPhoto,
	savePhoto,
	deletePhoto,
	generateRandomString,
	sendMail,
	validate,
};
