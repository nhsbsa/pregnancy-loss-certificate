//
// External dependencies


// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


router.post(/bobble/, (req, res) => {

  const confirmName = req.session.data['confirm-name']

  if (confirmName == 'yes') {
    res.redirect('contact-email');
  } else {
    res.redirect('confirm-name-kickout');
  }

})


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

router.post(/lobster/, (req, res) => {

  const SecurityCodeOption = req.session.data['security-code-option']

  if (SecurityCodeOption == 'telephone') {
    res.redirect('/beta/v15/v15-1/enter-security-code-text');
  } else {
    res.redirect('/beta/v15/v15-1/enter-security-code');
  }

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
router.post(/twincyacorrect/, (req, res) => {

  const twincheckDetails = req.session.data['check']
  const twins = req.session.data['twins']

  if (twincheckDetails == 'yes') {
    if (twins == 'true') {
      res.redirect('check-your-answers-twins');
    } else {
      res.redirect('declaration-single');
    }
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

router.post(/v15parent-number/, (req, res) => {

  const RefEnter = (req.session.data['v15ref-version'] || '').trim();

  if (RefEnter == '4321') {
    res.redirect('contact-email');
  } else {
    res.redirect('nhs-number');
  }

})
router.post(/requesting-cert-parent-2/, (req, res) => {


  const secondParentrequestanothercert = req.session.data['certreqsecondparent']

  if (secondParentrequestanothercert == 'yes') {
    res.redirect('reference-number');
  } else {
    res.redirect('confirmation-page');
  }

})

module.exports = router;
