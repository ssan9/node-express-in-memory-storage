'use strict';

const yup = require('yup');

const musiciansSchema = yup.array().of(
  yup.object({
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
  })
);

export default musiciansSchema;
