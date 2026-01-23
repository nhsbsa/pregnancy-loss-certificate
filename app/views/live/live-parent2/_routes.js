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



router.post(/action-nhs-number/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it
  //will take them to enter baby gender name
  const NHSNumber = req.session.data['nhs']

  if (NHSNumber == 'yes') {
    res.redirect('enter-nhs-number');
  } else {
    res.redirect('what-is-your-name');
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




router.post(/do-you-want-to-continue/, (req, res) => {


  const checkContinue = req.session.data['continue']

  if (checkContinue == 'yes') {
    res.redirect('reference-number');
  } else {
    res.redirect('continue-kickout');
  }

})
router.post(/is-this-correct/, (req, res) => {


  const checkCorrect = req.session.data['correct']

  if (checkCorrect == 'yes') {
    res.redirect('continue-kickout-second');
  } else {
    res.redirect('reference-number');
  }

})
router.post(/cya-correct/, (req, res) => {


  const checkDetails = req.session.data['check']

  if (checkDetails == 'yes') {
    res.redirect('declaration');
  } else {
    res.redirect('check-answers-kickout-copy');
  }

})
router.post(/cya-kickout/, (req, res) => {


  const answerKickout = req.session.data['kickout']

  if (answerKickout == 'yes') {
    res.redirect('check-answers-kickout');
  } else {
    res.redirect('check-your-answers');
  }

})
router.post(/parent-ref/, (req, res) => {

  const Referencepar2 = req.session.data['live-ref-parent']

  if (Referencepar2 == '123') {
    res.redirect('nhs-number');
  } else if (Referencepar2 == '4321') {
    res.redirect('contact-email')

  } else {
    res.redirect('contact-email');
  }

})


module.exports = router;
