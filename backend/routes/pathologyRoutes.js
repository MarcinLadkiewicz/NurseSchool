const router = require('express').Router();
const ctrl = require('../controllers/pathologyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/', auth, role(['enfermero']), ctrl.registerPathology);
router.get('/student/:student_id', auth, role(['enfermero', 'padre']), ctrl.getByStudentId);
//----
//Subir informe queda pendiente con Multer más tarde.