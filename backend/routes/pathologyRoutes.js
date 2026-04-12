const router = require('express').Router();
const ctrl = require('../controllers/pathologyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/', auth, role(['enfermero']),upload.single('report') ,ctrl.registerPathology);
router.put('/:id', auth, role(['enfermero']),upload.single('report') ,ctrl.updatePathology);
router.get('/students/:student_id', auth, role(['enfermero', 'padre']), ctrl.getByStudentId);


module.exports = router;