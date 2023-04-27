//
// External dependencies


// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const express = require('express');
const router = express.Router();

// ========================
// versions of routings
//==========================

router.use('/v1', require('./views/v1/_routes'));


module.exports = router;