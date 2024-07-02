const router = require('express').Router();
const aircraftsController = require('../controllers/aircrafts.js');
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/:id', isAuthenticated, validation.checkMongoId, aircraftsController.getSingle);
router.get('/', isAuthenticated, aircraftsController.getAll);
router.post('/', isAuthenticated, validation.saveAircraft, aircraftsController.createAircraft);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveAircraft, aircraftsController.updateAircraft);
router.delete('/:id', isAuthenticated, validation.checkMongoId, aircraftsController.deleteAircraft);

module.exports = router;