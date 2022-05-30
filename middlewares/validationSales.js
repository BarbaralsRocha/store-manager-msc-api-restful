const Joi = require('joi');

const productsDTO = Joi.array().items(
    {
    date: Joi.date().iso(),
    productId: Joi.number().required(),
    quantity: Joi.number().integer().positive().required(),
    },
).required().messages({
    'any.required': '400|{{#label}} is required',
    'number.base': '400|{{#label}} must be numeric',
    'number.positive': '422|{{#label}} must be greater than or equal to 1',
});

const validationSales = (req, res, next) => {
    const { error } = productsDTO.validate(req.body, { abortEarly: false });
    if (error) {
        console.log('erro');
        const [code, message] = error.message.split('|');
        return res.status(code).json({ message });
    }
    return next();
};

module.exports = validationSales;