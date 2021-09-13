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
getRandomImg();

const photoRandom = `https://source.unsplash.com/1200x600/?${getRandomImg()}`;

const validationsForms = (form) => {
	const errors = {};
	const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
	const regexComments = /^.{1,255}$/;

	if (!form.name.trim()) {
		errors.name = "El campo 'Nombre' es requerido";
	} else if (!regexName.test(form.name.trim())) {
		errors.name =
			"El campo 'Nombre' sólo acepta letras y espacios en blanco";
	}

	if (!form.email.trim()) {
		errors.email = "El campo 'Email' es requerido";
	} else if (!regexEmail.test(form.email.trim())) {
		errors.email = "El campo 'Email' es incorrecto";
	}

	if (!form.subject.trim()) {
		errors.subject = "El campo 'Asunto a tratar' es requerido";
	}

	if (!form.comments.trim()) {
		errors.comments = "El campo 'Consulta' es requerido";
	} else if (!regexComments.test(form.comments.trim())) {
		errors.comments =
			"El campo 'Consulta' no debe exceder los 255 caracteres";
	}

	return errors;
};

export { getRandomImg, validationsForms, photoRandom };
