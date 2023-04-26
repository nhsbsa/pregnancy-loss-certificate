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
     res.redirect('check-your-answers');;
     }
   });

router.get(/add-name/, function (req, res) {
  if (req.query.firstname == 'Jenny') {
    res.redirect('nhs-number');
  } else if (req.query.firstname == 'Sarah') {
    res.redirect('add-parent');;
  } 
  else {
    res.redirect('add-parent')
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

 router.get(/address-postcode/, function (req, res) {
  if (req.query.postcodeinput == 'NE1 3JA') {
    res.redirect('check-your-details');
  } else if (req.query.postcodeinput == 'NE2 4XL') {
    res.redirect('address-list');;
  } 
  else {
    res.redirect('add-parent')
  }

});