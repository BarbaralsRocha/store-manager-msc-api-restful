const Joi = require('joi');

const productsDTO = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().positive().required(),
}).required().messages({
    'any.required': '400|{{#label}} is required"',
    'string.base': '400|{{#label}} must be a string',
    'string.min': '422|{{#label}} length must be at least 5 characters long"',
    'number.base': '400|{{#label}} must be numeric',
    'number.positive': '422|{{#label}} must be greater than or equal to 1"',
});

const validationProducts = (req, res, next) => {
    const { error } = productsDTO.validate(req.body, { abortEarly: false });
    if (error) {
        const getError = error.message.split('|');
        return res.status(getError[0]).json({ message: getError[1] });
    }
    return next();
};

module.exports = validationProducts;