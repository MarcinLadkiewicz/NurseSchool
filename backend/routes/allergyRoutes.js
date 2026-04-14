const router = require('express').Router();
const ctrl = require('../controllers/allergyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const validateLength = require('../middlewares/validateLengthMiddleware');
const LIMITS = require('../utils/fieldLimits');

router.get('/', auth, role(['enfermero']), ctrl.getAllAllergies);
router.get(
  "/my-children",
  auth,
  role(["padre"]),
  ctrl.getAllergiesByMyChildren,
);
router.get('/students/:student_id', auth, role(['enfermero', 'padre']), ctrl.getAllergyByStudentId);
router.post('/', auth, role(['enfermero']),validateLength([
  {name: 'allergy_description', max: LIMITS.allergyDescription, label: 'Descripción de alergia'}
]), ctrl.registerAllergy);
router.put('/:id', auth, role(['enfermero']), validateLength([
  {name: 'allergy_description', max: LIMITS.allergyDescription, label: 'Descripción de alergia'}
]), ctrl.updateAllergy);
router.delete('/:id', auth, role(['enfermero']), ctrl.deleteAllergy);



module.exports = router;