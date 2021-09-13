const Joi = require('joi');

const deleteEntryPhotoScheme = Joi.object().keys({
    idEntry: Joi.number()
        .required()
        .min(1)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere el id de la noticia.');
                default:
                    return new Error('El id debe tener entre 1 y 4 dígitos');
            }
        }),
    idPhoto: Joi.number()
        .required()
        .min(1)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere el id de la photo que se desea eliminar');
                default:
                    return new Error('El id debe tener entre 1 y 4 caracteres');
            }
        }),
});

module.exports = deleteEntryPhotoScheme;