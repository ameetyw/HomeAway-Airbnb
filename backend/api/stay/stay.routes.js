const express = require('express');
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware');
const { saveStay, getStays, getById } = require('./stay.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStays);
router.get('/:stayId', log, getById);
router.post('/', log, saveStay);
router.put('/', log, saveStay);
// router.delete('/:id',  requireAuth, deleteReview)

module.exports = router;