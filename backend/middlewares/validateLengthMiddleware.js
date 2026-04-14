const validateLength = (fields) => {
    return (req, res, next) => {
        for(const {name, max, label} of fields) {
            const value = req.body[name];
            if(value && value.length > max){
                return res.status(400).json({
                    error: `${label || name} no puede superar los ${max} caracteres`
                })
            }
            next();
        }
    }
}
module.exports = validateLength;