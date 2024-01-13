const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
};

export default validateSchema;
