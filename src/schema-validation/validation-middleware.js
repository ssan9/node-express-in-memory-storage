/* eslint-disable import/prefer-default-export */
export const validation = schema => async (req, res, next) => {
  const { body } = req;

  // validating body's schema and returning an error if passed data types are incorrect
  try {
    await schema.validate(body);
    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
