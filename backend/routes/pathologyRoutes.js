const router = require('express').Router();
const ctrl = require('../controllers/pathologyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/', auth, role(['enfermero']), ctrl.registerPathology);
router.put('/:id', auth, role(['enfermero']), ctrl.updatePathology);
router.get('/students/:student_id', auth, role(['enfermero', 'padre']), ctrl.getByStudentId);
//----
//Subir informe queda pendiente con Multer más tarde.

module.exports = router;