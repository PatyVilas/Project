const Joi = require('joi');

const editUserSchema = Joi.object().keys({
    idUser: Joi.number()
        .required()
        .min(1)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Es requerido el id del usuario.');
                default:
                    return new Error('El id del usuario debe tener entre 1 y 4 dígitos');
            }
        }),
    name: Joi.string()
        .required()
        .min(2)
        .max(50)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('El nombre del usuario es requerido');
                default:
                    return new Error('El nombre no es válido. Debe contener entre 2 y 50 caracteres');
            }
        }),
    email: Joi.string()
        .required()
        .email()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any-required':
                    return new Error('Se requiere un email');
                default:
                    return new Error('El email no es válido');
            }
        }),
    biografia: Joi.string()
        .required()
        .min(10)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere una biografía nueva');
                default:
                    return new Error('La biografía debe contener un mínimo de 10 caracteres');
            }
        }),
});

module.exports = editUserSchema;