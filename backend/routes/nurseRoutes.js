const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/nurseController');


router.get('/dashboard', auth, role(['enfermero']), ctrl.dashboard);

module.exports = router;
