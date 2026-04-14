const router = require('express').Router();
const ctrl = require('../controllers/pathologyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validateLength = require('../middlewares/validateLengthMiddleware');
const LIMITS = require('../utils/fieldLimits');

router.post('/', auth, role(['enfermero']),upload.single('report'),validateLength([
    {name: 'pathology_name', max: LIMITS.pathologyName, label: 'Nombre de patología'},
    {name: 'pathology_description', max: LIMITS.pathologyDescription, label: 'Descripción'}
]) ,ctrl.registerPathology);
router.put('/:id', auth, role(['enfermero']),upload.single('report'),validateLength([
    {name: 'pathology_name', max: LIMITS.pathologyName, label: 'Nombre de patología'},
    {name: 'pathology_description', max: LIMITS.pathologyDescription, label: 'Descripción'},
]) ,ctrl.updatePathology);
router.get('/students/:student_id', auth, role(['enfermero', 'padre']), ctrl.getByStudentId);


module.exports = router;