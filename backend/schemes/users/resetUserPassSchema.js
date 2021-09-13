const Joi = require('joi');

const resetUserPassSchema = Joi.object().keys({
    recoverCode: Joi.string()
        .required()
        .min(40)
        .max(200)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere el código de recuperación de contraseña');
                case 'string.alphanum':
                    return new Error('El código de recuperación solo puede contener caracteres válidos como letras y números');
                default:
                    return new Error('El código debe contener un mínimo 40 caracteres válidos');
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

module.exports = resetUserPassSchema;