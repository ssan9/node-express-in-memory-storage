const yup = require('yup');

// creating schema for put requests to ensure correct type of data is passed
export const musiciansSchema = yup.object({
  id: yup.string().required(),
  firstName: yup
    .string()
    .max(50)
    .required(),
  lastName: yup
    .string()
    .max(50)
    .required(),
  genre: yup
    .string()
    .matches(/(JAZZ|ROCK|BLUES)/)
    .required(),
});

export const musiciansUpdateSchema = yup.object({
  firstName: yup
    .string()
    .max(50)
    .required(),
  lastName: yup
    .string()
    .max(50)
    .required(),
  genre: yup
    .string()
    .matches(/(JAZZ|ROCK|BLUES)/)
    .required(),
});
