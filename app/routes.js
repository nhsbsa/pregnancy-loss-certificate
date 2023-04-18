//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//////v1 routing/////////

router.get(/location-england/, function (req, res) {
    if (req.query.location == 'yes') {
      res.redirect('date-of-loss');
    }
     else if (req.query.location == 'no') {
     res.redirect('location-kickout');;
     }
   });
  

   router.get(/baby-gender-version1/, function (req, res) {
    if (req.query.gender == 'yes') {
      res.redirect('enter-baby-gender');
    }
     else if (req.query.gender == 'no') {
     res.redirect('babys-name');;
     }
   });

   router.get(/baby-name-version1/, function (req, res) {
    if (req.query.babyname == 'yes') {
      res.redirect('enter-baby-name');
    }
     else if (req.query.babyname == 'no') {
     res.redirect('enter-address');;
     }
   });
