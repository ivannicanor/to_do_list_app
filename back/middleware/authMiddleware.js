const jwt = require('jsonwebtoken');


exports.verifyToken =  (req, res, next) =>  {

   const header = req.headers['authorization'];
   const token = header && header.split(" ")[1];  //undefined

   if (!token) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }

   jwt.verify(token, process.env.JWT_SECRET,(error,decoded) =>{

      if (error) {
        return res.status(403).json({ message: 'token invalido' });
      }
      req.user = decoded;
      next();
   });

}