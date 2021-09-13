const Joi = require('joi');

const getUserSchema = Joi.object().keys({
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
});

module.exports = getUserSchema;