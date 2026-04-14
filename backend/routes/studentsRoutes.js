const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/studentsController');
const validateLength = require('../middlewares/validateLengthMiddleware');
const LIMITS = require('../utils/fieldLimits');

router.get('/', auth, role(['enfermero']), ctrl.getAll);
router.get('/parents/list', auth, role(['enfermero']), ctrl.getParents);
router.get('/:id', auth, role(['enfermero', 'padre']), ctrl.getById);
router.post('/', auth, role(['enfermero']), validateLength([
    {name: 'name', max: LIMITS.studentName, label: 'Nombre'},
    {name: 'surname', max: LIMITS.studentSurname, label: 'Apellidos'},
    {name: 'course', max: LIMITS.studentCourse, label: 'Curso'},
]),ctrl.create);
router.put('/:id', auth, role(['enfermero']),validateLength([
    {name: 'name', max: LIMITS.studentName, label: 'Nombre'},
    {name: 'surname', max: LIMITS.studentSurname, label: 'Apellidos'},
    {name: 'course', max: LIMITS.studentCourse, label: 'Curso'},
]) ,ctrl.update);

router.get('/padre/:padreId', auth, role(['padre']), ctrl.getByFatherId);

module.exports = router;