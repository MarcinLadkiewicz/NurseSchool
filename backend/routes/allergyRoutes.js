const router = require('express').Router();
const ctrl = require('../controllers/allergyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.get('/', auth, role(['enfermero']), ctrl.getAllAllergies);
router.get(
  "/my-children",
  auth,
  role(["padre"]),
  ctrl.getAllergiesByMyChildren,
);
router.get('/students/:student_id', auth, role(['enfermero', 'padre']), ctrl.getAllergyByStudentId);
router.post('/', auth, role(['enfermero']), ctrl.registerAllergy);
router.put('/:id', auth, role(['enfermero']), ctrl.updateAllergy);
router.delete('/:id', auth, role(['enfermero']), ctrl.deleteAllergy);

//--- FALTA CREAR ENDPOINTS CON UPLOAD DE ARCHIVO --MULTER lo haré al final.

module.exports = router;