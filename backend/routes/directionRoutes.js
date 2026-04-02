const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/directionController');


router.get('/attentions', auth, role(['direccion']), ctrl.getAllAttentions);
router.get('/allergies', auth, role(['direccion']), ctrl.getAllAllergies);
router.get('/summary', auth, role(['direccion']), ctrl.summary);

module.exports = router;