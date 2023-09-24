import Joi from "joi";

const userRegistrationSchema = async () => {
  return Joi.object({
    firstName: Joi.string().min(2).required().messages({
      "string.base": "name should be string",
      "string.min": "name should include 2 or more characters",
      "any.required": "name is required",
    }),
    lastName: Joi.string().min(2).required().messages({
      "string.base": "name should be string",
      "string.min": "name should include 2 or more characters",
      "any.required": "name is required",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ge"] } })
      .required()
      .messages({
        "string.base": "email should be a string",
        "string.email": "email should be a valid email address",
        "any.required": "email is required",
      }),
  });
};

export default userRegistrationSchema;
