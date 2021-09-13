const Joi = require('joi');

const voteEntrySchema = Joi.object().keys({
    idEntry: Joi.number()
        .required()
        .min(1)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere el id de la noticia.');
                default:
                    return new Error('El id de noticia debe tener entre 1 y 4 dígitos.');
            }
        }),
    idUser: Joi.number()
        .required()
        .min(1)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere el id de usuario para poder valorar la noticia');
                default:
                    return new Error('El id de usuario debe tener entre 1 y 4 dígitos');
            }
        }),
    vote: Joi.boolean()
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('El voto es necesario para valorar una noticia');
                default:
                    return new Error('El voto solo puede ser true o false');
            }
        }),
});

module.exports = voteEntrySchema;