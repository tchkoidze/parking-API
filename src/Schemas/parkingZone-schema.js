import Joi from "joi";

const parkingZoneSchema = async () => {
  return Joi.object({
    parkingName: Joi.string().required().messages({
      "string.base": "email should be a string",
      "any.required": "Parking name is required.",
    }),
    address: Joi.string().required().messages({
      "string.base": "email should be a string",
      "any.required": "Address is required.",
    }),
    hourlyCost: Joi.number().precision(2).required().messages({
      "number.base": "Hourly cost must be a number.",
      "number.precision": "Hourly cost must have exactly 2 decimal places.",
      "any.required": "Hourly cost is required.",
    }),
  });
};

export default parkingZoneSchema;
