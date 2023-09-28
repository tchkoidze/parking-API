import Joi from "joi";

const parkingZoneSchema = async () => {
  return Joi.object({
    parkingName: Joi.string()
      .regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/)
      .required(),
    address: Joi.string().required(),
    hourlyCost: Joi.number().precision(2).required(),
  });
};

export default parkingZoneSchema;
