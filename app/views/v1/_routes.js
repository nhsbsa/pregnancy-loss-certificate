//
// External dependencies

const express = require('express');
const router = express.Router();

// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//


// Add your routes here

//////v1 routing/////////



router.post(/location-england/, function (req, res) {
    if (req.query.location == 'yes') {
      res.redirect('date-of-loss');
    }
     else if (req.query.location == 'no') {
     res.redirect('location-kickout');
     } else {
      res.redirect('location-kickout');
      
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
     res.redirect('check-your-answers');;
     }
   });


router.get(/nhs-number-action/, function (req, res) {
  if (req.query.nhs == 'yes') {
    res.redirect('enter-nhs-number');
  }
   else if (req.query.nhs == 'no') {
   res.redirect('check-your-details');;
   }
 });
 router.get(/parent-add/, function (req, res) {
  if (req.query.parent == 'yes') {
    res.redirect('second-relation-to-baby');
  }
   else if (req.query.parent == 'no') {
   res.redirect('sex-of-baby');;
   }
 });
 router.get(/address-postcode/, function (req, res) {
  if (req.query.postcodeinput == 'NE1 3JA') {
    res.redirect('nhs-number');
  } else if (req.query.postcodeinput == 'NE2 4XL') {
    res.redirect('address-list');;
  } 
  else {
    res.redirect('address-list')
  }
});

module.exports = router;