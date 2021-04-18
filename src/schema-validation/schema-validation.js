'use strict';

const yup = require('yup');

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
