const express = require('express');
const careerController = require('./../controllers/careerController');
const authConroller = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.use(authConroller.protect);

router.get('/getallopp', careerController.getalljob);
router.get('/getalljobs', careerController.getalljobs);

// router.get('/:slug', careerController.getjobbyid);
router.get('/acceptedrequests', careerController.getaccepted);
router.get('/:slug', viewController.getcareerinfo);
router.get('/:slug/applyform', viewController.getform);
router.get('/getalljobs/publishcareer', viewController.getpublishcareer);
router.get('/me/getallappliedjobs', careerController.getallapplications);
router.get('/me/getappliedjobs', careerController.getapplicationbyuser);
router.patch('/acceptrequest/:id', careerController.accept);
router.patch('/rejectrequest/:id', careerController.reject);
router.patch('/:id/updatecareer', careerController.update);

router.post('/submit', careerController.createApplication);

module.exports = router;
