const Joi = require('joi');

const newEntrySchema = Joi.object().keys({
    place: Joi.string()
        .required()
        .min(2)
        .max(50)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere un lugar');

                default:
                    return new Error(
                        'El lugar debe tener entre 2 y 50 caracteres'
                    );
            }
        }),
    title: Joi.string()
        .required()
        .min(2)
        .max(70)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere un título');

                default:
                    return new Error(
                        'El título debe tener entre 2 y 70 caracteres'
                    );
            }
        }),
    them: Joi.string()
        .required()
        .min(2)
        .max(30)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere un tema');

                default:
                    return new Error(
                        'El tema debe tener entre 2 y 30 caracteres'
                    );
            }
        }),
    lead: Joi.string()
        .required()
        .min(2)
        .max(300)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere una entradilla');

                default:
                    return new Error(
                        'La entradilla debe tener entre 2 y 300 caracteres'
                    );
            }
        }),
    description: Joi.string()
        .required()
        .min(10)
        .max(1000)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Se requiere una descripción');

                default:
                    return new Error(
                        'La descripción debe tener entre 10 y 1000 caracteres'
                    );
            }
        }),
});

module.exports = newEntrySchema;