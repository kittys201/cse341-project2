const router = require('express').Router();
const birdsController = require('../controllers/birds.js');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/:id', isAuthenticated, validation.checkMongoId, birdsController.getSingle);
router.get('/', isAuthenticated, birdsController.getAll);
router.post('/', isAuthenticated, validation.saveBird, birdsController.createBird);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveBird, birdsController.updateBird);
router.delete('/:id', isAuthenticated, validation.checkMongoId, birdsController.deleteBird);

module.exports = router;