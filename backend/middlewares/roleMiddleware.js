const role = (rolesPermitidos) => {
    return (req, res, next) => {
        if(!rolesPermitidos.includes(req.user.rol)){
            return res.status(403).json({error: 'No tienes permiso'});
        }
        next();
    };
};

module.exports = role;