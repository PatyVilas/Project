const Joi = require('joi');

const recoverPassSchema = Joi.object().keys({
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
});

module.exports = recoverPassSchema;