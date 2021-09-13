const Joi = require('joi');

const loginUserSchema = Joi.object().keys({
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

module.exports = loginUserSchema;