const Joi = require('joi');

const editPasswordSchema = Joi.object().keys({
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
    oldPassword: Joi.string()
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
    newpassword: Joi.string()
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

module.exports = editPasswordSchema;