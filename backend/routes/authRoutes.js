const router = require('express').Router();
const ctrl = require('../controllers/authController');
const validateLength = require('../middlewares/validateLengthMiddleware');
const LIMITS = require('../utils/fieldLimits');

router.post('/register',validateLength([
    {name: 'name', max: LIMITS.userName, label: 'Nombre'},
    {name: 'email', max: LIMITS.userEmail, label: 'Correo Electrónico'},
]), ctrl.register);
router.post('/login', ctrl.login);
router.put('/push-token', ctrl.updatePushToken);

module.exports = router;