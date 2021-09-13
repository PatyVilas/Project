const Joi = require('joi');

const newUserSchema = Joi.object().keys({
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

    password: Joi.string()
        .required()
        .alphanum()
        .min(8)
        .max(100)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere una contraseña válida.');
                case 'string.alphanum':
                    return new Error('La contraseña solo puede contener caracteres válidos como letras y números');
                default:
                    return new Error('La contraseña debe tener entre 8 y 100 caracteres');
            }
        }),
});

module.exports = newUserSchema;