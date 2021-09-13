const Joi = require('joi');

const listEntriesSchema = Joi.object().keys({
    order: Joi.string()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('');
                default:
                    return new Error('Los valores de búqueda admitidos son: place, date, votes o thems');
            }
        }),
    direction: Joi.string()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('');
                default:
                    return new Error('La dirección de busqueda puede ser ASC o DESC');
            }
        }),

});

module.exports = listEntriesSchema;