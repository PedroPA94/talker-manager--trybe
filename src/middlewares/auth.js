module.exports = (req, res, next) => {
  const requestToken = req.headers.authorization;

  if (!requestToken) return res.status(401).json({ message: 'Token não encontrado' });

  if (requestToken.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};