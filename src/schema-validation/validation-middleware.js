export const validation = schema => async (req, res, next) => {
  const { body } = req;

  try {
    await schema.validate(body);
    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
