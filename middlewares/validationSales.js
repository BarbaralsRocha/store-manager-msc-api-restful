const Joi = require('joi');

const productsDTO = Joi.array().items(
    {
    date: Joi.date().iso(),
    productId: Joi.number().required(),
    quantity: Joi.number().positive().required(),
    },
).required().messages({
    'any.required': '400|{{#label}} is required"',
    'number.base': '400|campo {{#label}} deve ser numérico',
    'number.positive': '422|{{#label}} must be greater than or equal to 1"',
});

const validationSales = (req, res, next) => {
    const { error } = productsDTO.validate(req.body, { abortEarly: false });
    if (!error) {
        return next();
    }
    const getError = error.message.split('|');
    res.status(getError[0]).json(getError[1]);
};

module.exports = validationSales;