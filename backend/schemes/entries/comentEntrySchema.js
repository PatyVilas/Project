const Joi = require('joi');

const comentEntrySchema = Joi.object().keys({
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
    coment: Joi.string()
        .required()
        .min(5)
        .max(10000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Es requerido un comentario.');
                default:
                    return new Error('El comentario debe tener un mínimo de caracteres');
            }
        }),
});

module.exports = comentEntrySchema;