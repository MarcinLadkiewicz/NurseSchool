const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        return res.status(401).json({error: 'No se envió el token'});
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({error: 'Token inválido o expirado'});
    }
};

module.exports = auth;