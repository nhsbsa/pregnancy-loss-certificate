//
// External dependencies


// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post(/location-england/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossInEngland = req.session.data['location']

  if (lossInEngland == 'yes') {
    res.redirect('date-of-loss');
  } else {
    res.redirect('location-kickout');
  }

})


router.post(/baby-gender-version1/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const SexOfBaby = req.session.data['gender']

  if (SexOfBaby == 'yes') {
    res.redirect('enter-baby-gender');
  } else {
    res.redirect('babys-name');
  }

})


router.post(/baby-name-version1/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const NameBaby = req.session.data['babyname']

  if (NameBaby == 'yes') {
    res.redirect('enter-baby-name');
  } else {
    res.redirect('check-your-answers');
  }

})

router.post(/nhs-number-action/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const NHSNumber = req.session.data['nhs']

  if (NHSNumber == 'yes') {
    res.redirect('enter-nhs-number');
  } else {
    res.redirect('check-your-details');
  }

})
router.post(/parent-add/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const AddParent = req.session.data['parent']

  if (AddParent == 'yes') {
    res.redirect('second-relation-to-baby');
  } else {
    res.redirect('sex-of-baby');
  }

})

router.post(/address-postcode/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const AddressPostcode = req.session.data['postcodeinput']

  if (AddressPostcode == 'NE1 3JA') {
    res.redirect('nhs-number');
  } else {
    res.redirect('address-list');
  }

})






// router.get(/baby-gender-version1/, function (req, res) {
//   if (req.query.gender == 'yes') {
//     res.redirect('enter-baby-gender');
//   }
//    else if (req.query.gender == 'no') {
//    res.redirect('babys-name');;
//    }
//  });


// router.post(/date-of-birth/, (req, res) => {

//   const day = req.session.data['dob-day']
//   const month = req.session.data['dob-month']
//   const year = req.session.data['dob-year']

//   const dob = day + '/' + month + '/' + year

//   if (dob == '28/04/2023') {
// // do something
//   } else {
// // do something else
//   }

//})



module.exports = router;