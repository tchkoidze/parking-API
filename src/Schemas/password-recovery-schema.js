import Joi from "joi";

const passwordRecoverySchema = async () => {
  return Joi.object({
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

export default passwordRecoverySchema;
