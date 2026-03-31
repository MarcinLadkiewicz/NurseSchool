const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/dashboardController');


router.get('/nurseDashboard', auth, role(['enfermero']), ctrl.nurseDashboard);
router.get('/parentDashboard', auth, role(['padre']), ctrl.parentDashboard);
module.exports = router;
