import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

export function isAuthenticated(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  // Verifica si el token es válido
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }

      // Si el token es válido, pasa al siguiente middleware o ruta
      req.user = decoded;
      next();
  });
};


export function ValidToken (token) {
  // Verifica si el token es válido
  return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
              resolve(null);
          }

          // Si el token es válido, pasa al siguiente middleware o ruta
          resolve(decoded);
      });
  });
}
