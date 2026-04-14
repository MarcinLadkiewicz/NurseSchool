const router = require ('express').Router();
const ctrl = require('../controllers/attentionController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const validateLength = require('../middlewares/validateLengthMiddleware');
const LIMITS = require('../utils/fieldLimits');


router.get('/', auth, role(['enfermero']), ctrl.getAllAttentions);
router.get('/my-children', auth, role(['padre']), ctrl.getAttentionByMyChildren);
router.get('/:id',  auth, role(['enfermero', 'padre']), ctrl.getById);
router.get('/students/:id', auth, role(['enfermero']), ctrl.getByStudentId);
router.get('/pdf/attention/:id', auth, role(['enfermero']), ctrl.generateAttentionPdf);
router.get('/pdf/history/:studentId', auth, role(['enfermero']), ctrl.generateHistoryPdf);

router.post('/', auth, role(['enfermero']),validateLength([
    {name: 'reason', max: LIMITS.attentionReason, label: 'Motivo'},
    {name: 'actuation', max: LIMITS.attentionActuation, label: 'Actuación'},
    {name: 'actuation_description', max: LIMITS.attentionDescription, label: 'Descripción'},
]) ,ctrl.createAttention);

module.exports = router;