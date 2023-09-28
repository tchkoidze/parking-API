import Joi from "joi";

const userCarSchema = async () => {
  return Joi.object({
    carName: Joi.string().required().messages({
      "any.required": "Car name is required.",
      "string.base": "Car name must be a string.",
    }),
    registrationPlate: Joi.string()
      .regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/)
      .required()
      .messages({
        "any.required": "Registration plate is required.",
        "string.base": "Registration plate must be a string.",
        "string.pattern.base":
          "Registration plate must match the format AB-123-CD.",
      }),
    type: Joi.string()
      .valid(
        "Sedan",
        "Sports car",
        "Station wagon",
        "Coupe",
        "Hatchback",
        "Convertible",
        "Minivan",
        "Pickup truck",
        "Off-road vehicle",
        "Luxury vehicle",
        "Hybrid vehicle",
        "Limousine",
        "Pony car",
        "Electric car",
        "Crossover",
        "Truck",
        "Microcar"
      )
      .required()
      .messages({
        "any.required": "Car type is required.",
        "any.only": "Invalid car type.",
      }),
  });
};

export default userCarSchema;
