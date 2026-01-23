//
// External dependencies


// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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

router.post(/location-v14-england/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const version14lossInEngland = req.session.data['version14location']

  if (version14lossInEngland == 'yes') {
    res.redirect('relation-to-baby');
  } else {
    res.redirect('location-kickout');
  }

})

router.post(/england-version14/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossIneng = req.session.data['england']

  if (lossIneng == 'yes') {
    res.redirect('relation-to-baby');
  } else {
    res.redirect('location-kickout-uk');
  }

})


router.post(/relation-baby/, (req, res) => {

  const relationship = req.session.data['relation-baby']

  if (relationship == 'no') {
      res.redirect('relation-kickout')
  } else {
      res.redirect('nhs-number')
  }

})



router.post(/baby-gender-singleroute/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const SexOfBaby = req.session.data['gender']

  if (SexOfBaby == 'yes') {
    res.redirect('enter-baby-gender-single');
  } else {
    res.redirect('babys-name-single');
  }

})

router.post(/baby-gender-cert-2/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const SexOfBaby = req.session.data['gender']

  if (SexOfBaby == 'yes') {
    res.redirect('enter-baby-gender-copy');
  } else {
    res.redirect('babys-name-copy');
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
    res.redirect('babies-lost');
  }

})

router.post(/postcode/, (req, res) => {

  const AddressPostcodeMult = req.session.data['multiplepost']

  if (AddressPostcodeMult == 'EN1 1BE') {
    res.redirect('location-kickout-uk');
  } else if (AddressPostcodeMult == 'EN11BE') {
    res.redirect('location-kickout-uk');
  } else if (AddressPostcodeMult == 'en1 1be') {
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
    res.redirect('add-parent-conditional-radios');
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
router.post(/another-request-cert/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const CertificateRequest = req.session.data['certreq']

  if (CertificateRequest == 'no') {
    res.redirect('confirmation-page-new');
  } else {
    res.redirect('add-other-parent');
  }

})
router.post(/single-cert-reccurrent/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const reccurrentReq = req.session.data['certreq']

  if (reccurrentReq == 'no') {
    res.redirect('confirmation-page-new-single');
  } else {
    res.redirect('add-other-parent');
  }

})
router.post(/mult-cert-req/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const MultLoss = req.session.data['multcert']

  if (MultLoss == 'no') {
    res.redirect('/v14-5/relation-to-baby');
  } else {
    res.redirect('add-other-parent');
  }

})
router.post(/multiple-loss-pregnancy/, (req, res) => {

  const TwinTripletSingle = req.session.data['loss-multiple']

  if (TwinTripletSingle == 'single') {
    res.redirect('date-of-loss-single');
  } else if (TwinTripletSingle == 'twin') {
    res.redirect('twin-loss-2')
  } else if (TwinTripletSingle == 'triplet') {
    res.redirect('triplet-loss-2')
  } else {
    res.redirect('location-kickout-uk');
  }

})
router.post(/twin-losses/, (req, res) => {

  const Twinlossbabies = req.session.data['bothbabies']

  if (Twinlossbabies == 'yes') {
    res.redirect('date-of-loss');
  } else {
    res.redirect('date-of-loss-single');
  }

})

router.post(/baby-details-conditional/, (req, res) => {

  const AddAnotherBaby = req.session.data['add-second-baby']

  if (AddAnotherBaby == 'yes') {
    res.redirect('date-of-loss');
  } else {
    res.redirect('contact-email');
  }

})
module.exports = router;
