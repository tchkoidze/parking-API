import Joi from "joi";

const passwordResetSchema = async () => {
  return Joi.object({
    recoveryToken: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9!,-_.]).*$/)
      .required()
      .messages({
        "string.base": "password should be a string",
        "string.min": "password should consist of minimum 8 characters",
        "string.pattern":
          "password must start with a capital letter and can contain letters, digits, and characters like !, -, _, and .",
        "string.required": "password isrequired",
      }),
  });
};

export default passwordResetSchema;
