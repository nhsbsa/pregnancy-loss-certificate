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


//////////////////////////////
////////   Live   ////////
//////////////////////////////


router.use('live', require('./views/live/_routes'));
router.use('live', require('./views/live/live-parent2/_routes'));



//////////////////////////////
////////   Beta  ////////
//////////////////////////////
router.use('back-office', require('./views/back-office/_routes'));
router.use('ccs', require('./views/ccs/_routes'));
router.use('ccs2', require('./views/ccs2/_routes'));
router.use('ccs3', require('./views/ccs3/_routes'));


router.use('beta/v15-ccs', require('./views/beta/v15-ccs/_routes'));
router.use('beta/v15', require('./views/beta/v15/_routes'));
router.use('beta/v15/v15-1', require('./views/beta/v15/v15-1/_routes'));
//router.use('beta/v15/v15-5', require('./views/beta/v15/v15-5/_routes'));



router.use('beta/v14', require('./views/beta/v14/_routes'));
router.use('beta/v14/v14-1', require('./views/beta/v14/v14-1/_routes'));
router.use('beta/v14/v14-5', require('./views/beta/v14/v14-5/_routes'));

router.use('beta/v13', require('./views/beta/v13/_routes'));

router.use('beta/v12', require('./views/beta/v12/_routes'));
router.use('beta/v12/12-1', require('./views/beta/v12/v12-1/_routes'));
router.use('beta/v12/12-2', require('./views/beta/v12/v12-2/_routes'));


router.use('beta/v11', require('./views/beta/v11/_routes'));
router.use('beta/v11/ccs', require('./views/beta/v11/ccs/_routes-ccs'));
router.use('beta/v11/back-office', require('./views/beta/v11/back-office/_routes-backoffice'));

router.use('beta/v10', require('./views/beta/v10/_routes'));

router.use('beta/v9', require('./views/beta/v9/_routes'));
router.use('beta/v9-2', require('./views/beta/v9-2/_routes'));
router.use('beta/v9-3', require('./views/beta/v9-3/_routes'));

router.use('beta/v8/v8-1', require('./views/beta/v8/v8-1/_routes'));
router.use('beta/no-second-parent', require('./views/beta/no-second-parent/_routes'));

router.use('beta/v7', require('./views/beta/v7/_routes'));
router.use('beta/v7/v7-1', require('./views/beta/v7/v7-1/_routes'));

router.use('beta/v6', require('./views/beta/v6/_routes'));
router.use('beta/v6-2', require('./views/beta/v6-2/_routes'));
router.use('beta/v6-4', require('./views/beta/v6-4/_routes'));

router.use('beta/s3-1', require('./views/beta/s2/s2-1/_routes'));
router.use('beta/s3', require('./views/beta/s2/_routes'));

router.use('beta/s2-1', require('./views/beta/s2/s2-1/_routes'));
router.use('beta/s2', require('./views/beta/s2/_routes'));

router.use('beta/s1', require('./views/beta/s1/_routes'));


//////////////////////////////
////////   discovery/alpha   ////////
//////////////////////////////

router.use('discovery-alpha/v6', require('./views/discovery-alpha/v6/_routes'));
router.use('discovery-alpha/v5', require('./views/discovery-alpha/v5/_routes'));
// router.use('/ccs', require('./views/css/_routes'));
router.use('discovery-alpha/v4', require('./views/discovery-alpha/v4/_routes'));
router.use('discovery-alpha/v3', require('./views/discovery-alpha/v3/_routes'));
router.use('discovery-alpha/v2', require('./views/discovery-alpha/v2/_routes'));
router.use('discovery-alpha/v1', require('./views/discovery-alpha/v1/_routes'));

//////////////////////////////
////////    CRM       ////////
//////////////////////////////

router.use('crm', require('./views/crm/_routes-crm'));

module.exports = router;
