//
// External dependencies


// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//////////////////////////////
////////   Versions   ////////
//////////////////////////////
router.use('/v6', require('./views/v6/_routes'));
router.use('/v5', require('./views/v5/_routes'));
//router.use('/ccs', require('./views/css/_routes'));
router.use('/v4', require('./views/v4/_routes'));
router.use('/v3', require('./views/v3/_routes'));
router.use('/v2', require('./views/v2/_routes'));
router.use('/v1', require('./views/v1/_routes'));




module.exports = router;
