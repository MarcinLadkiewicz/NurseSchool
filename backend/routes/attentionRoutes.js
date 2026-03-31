const router = require ('express').Router();
const ctrl = require('../controllers/attentionController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');


router.get('/', auth, role(['enfermero']), ctrl.getAllAttentions);
router.get('/:id',  auth, role(['enfermero', 'padre']), ctrl.getById);
router.get('/students/:id', auth, role(['enfermero']), ctrl.getByStudentId);

router.post('/', auth, role(['enfermero']), ctrl.createAttention);


/*

AÑADIR MIDDLEWARE DE MULTER PARA HACER UPLOADS DE DOCUMENTOS. 

router.post('/:id', auth, role(['enfermero']), ctrl.postAttentionDocument);






*/
module.exports = router;