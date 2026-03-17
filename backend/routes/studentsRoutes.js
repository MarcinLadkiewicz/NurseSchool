const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/studentsController');

router.get('/', auth, role(['enfermero']), ctrl.getAll);
router.get('/parents/list', auth, role(['enfermero']), ctrl.getParents);
router.get('/:id', auth, role(['enfermero']), ctrl.getById);
router.post('/', auth, role(['enfermero']), ctrl.create);
router.put('/:id', auth, role(['enfermero']), ctrl.update);

router.get('/padre/:padreId', auth, role(['padre']), ctrl.getByFatherId);

module.exports = router;