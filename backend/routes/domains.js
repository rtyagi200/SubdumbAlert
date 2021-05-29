const express = require('express');
const router = express.Router();

//Load Controllers
const { getDomainController, addDomainController, editDomainController, deleteDomainController, getEditDomainController } = require('../controllers/domain.controller.js');

const {checkUserAccess} = require('../middleware/authentication');

router.get('/', getDomainController);

router.post('/add-new-domain', checkUserAccess, addDomainController);

router.patch('/edit-domain', checkUserAccess, editDomainController);

router.delete('/delete-domain', checkUserAccess, deleteDomainController);

router.post('/get-edit-domain', checkUserAccess, getEditDomainController);



module.exports = router;