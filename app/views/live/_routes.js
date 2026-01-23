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
    res.redirect('loss-in-5-years');
  } else {
    res.redirect('location-kickout');
  }

})

router.post(/location-uk/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossInuk = req.session.data['location']

  if (lossInuk == 'yes') {
    res.redirect('relation-to-baby');
  } else {
    res.redirect('location-kickout-uk');
  }

})
router.post(/loss-5-years/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossInYears = req.session.data['years']

  if (lossInYears == 'yes') {
    res.redirect('relation-to-baby');
  } else {
    res.redirect('date-of-loss-kickout');
  }

})

// Date of loss

// router.post(/date-loss/, (req, res) => {

//   const day = req.session.data['dol-day']
//   const month = req.session.data['dol-month']
//   const year = req.session.data['dol-year']

//   const dol = day + '/' + month + '/' + year

//   if (dol == '27/3/2007') {
//     res.redirect('relation-to-baby');
//   } else {
//     res.redirect('date-of-loss-kickout');
// }

// })

// Date of birth

router.post(/new-dob/, (req, res) => {
  console.log('✅ V15 DATE OF BIRTH ROUTE HIT')

  const day = Number(req.session.data['dob-day'])
  const month = Number(req.session.data['dob-month'])
  const year = Number(req.session.data['dob-year'])

  if (day === 27 && month === 3 && year === 2007) {
    return res.redirect('date-of-birth-kickout')
  }

  return res.redirect('enter-address')
})

router.post(/relation-baby/, (req, res) => {

  const relationship = req.session.data['relation-baby']

  if (relationship == 'no') {
      res.redirect('relation-kickout')
  } else {
      res.redirect('nhs-number')
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




router.post(/main-applicant-nhs/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const NHSNumber = req.session.data['nhs']

  if (NHSNumber == 'yes') {
    res.redirect('enter-nhs-number');
  } else {
    res.redirect('what-is-your-name');
  }

})
router.post(/version10-add-parent/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const parentAddParent = req.session.data['parent']

  if (parentAddParent == 'yes') {
    res.redirect('what-happens-next');
  } else {
    res.redirect('babys-details');
  }

})

router.post(/postcode/, (req, res) => {

  const AddressPostcode = req.session.data['multiplepost']

  if (AddressPostcode == 'EN1 1BE') {
    res.redirect('location-kickout-uk');
  } else if (AddressPostcode == 'en1 1be') {
    res.redirect('location-kickout-uk');
  } else if (AddressPostcode == 'en11be') {
    res.redirect('location-kickout-uk');
  } else if (AddressPostcode == 'EN1 1BE') {
    res.redirect('location-kickout-uk');
  } else {
    res.redirect('check-your-details');
  }

})



router.post(/confirm-post-address/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const parentcheckDetails = req.session.data['details']

  if (parentcheckDetails == 'yes') {
    res.redirect('add-parent');
  } else {
    res.redirect('check-your-details-kickout');
  }

})

router.post(/enter-your-name/, (req, res) => {

  res.redirect('enter-date-of-birth')

})


router.post(/enter-parent-name/, (req, res) => {

  res.redirect('date-of-loss')

})


router.post(/idv-other-email/, (req, res) => {

  const parentContact = req.session.data['contact']

  if (parentContact == 'yes') {
    res.redirect('enter-date-of-birth-parent');
  } else {
    res.redirect('parent-contact-kickout');
  }

})
router.post(/multiple-certificate/, (req, res) => {

  const MultCert = req.session.data['cert']

  if (MultCert == 'yes') {
    res.redirect('confirmation-page-copy');
  } else {
    res.redirect('confirmation-page');
  }

})

router.post(/email-security-code/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const securityCode = req.session.data['seccode']

  if (securityCode == 'email') {
    res.redirect('enter-security-code');
  } else {
    res.redirect('enter-security-code-text');
  }

})
router.post(/live-req-another/, (req, res) => {
liveotherreq = req.session.data['liverequestcertififcate']

  if (liveotherreq == 'yes') {
    res.redirect('add-other-parent');
  } else {
    res.redirect('confirmation-page-new');
  }

})

router.post(/triplets-loss-2/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const tripletLoss = req.session.data['triplet-loss']

  if (tripletLoss == 'single') {
    res.redirect('date-of-loss-single');
  } else if (tripletLoss == 'twin') {
    res.redirect('date-of-loss');
  } else {
    res.redirect('triplet-loss-2#');
  }

})

module.exports = router;
