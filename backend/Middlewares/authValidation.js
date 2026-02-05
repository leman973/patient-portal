const Joi = require('joi')

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            "string.base": "Name must be a text value",
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name must be less than or equal to 100 characters",
            "any.required": "Name is required",
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),
        password: Joi.string().min(4).max(100).required().messages({
            "string.min": "Password must be at least 4 characters long",
            "string.max": "Password must be less than or equal to 100 characters",
            "any.required": "Password is required",
        }),
        age: Joi.number()
            .integer()
            .min(1)
            .max(120)
            .required()
            .messages({
                "number.base": "Age must be a number",
                "number.min": "Age must be at least 1",
                "number.max": "Age must be less than or equal to 120",
                "any.required": "Age is required",
            }),
        phone: Joi.string()
            .pattern(/^[6-9]\d{9}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be a valid 10-digit Indian number",
                "any.required": "Phone number is required",
            }),
        gender: Joi.string()
            .valid("Male", "Female", "Other")
            .required()
            .messages({
                "any.only": "Gender must be male, female, or other",
                "any.required": "Gender is required",
            }),
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({
                message: error.details[0].message,
                success: false,
            });
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),
        password: Joi.string().min(4).max(100).required().messages({
            "string.min": "Password must be at least 4 characters long",
            "string.max": "Password must be less than or equal to 100 characters",
            "any.required": "Password is required",
        }),
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error: error.details[0].message });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}