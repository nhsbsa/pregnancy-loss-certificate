const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const obfuscatorEmail = require('obfuscator-email')


// GOV Notify integration - ask Matt F for the API key if you need it
var NotifyClient = require('notifications-node-client').NotifyClient,
  notify = new NotifyClient(process.env.NOTIFYAPIKEY)


// add data to terminal output
router.use((req, res, next) => {
  const log = {
    method: req.method,
    url: req.originalUrl,
    data: req.session.data
  }
  console.log(JSON.stringify(log, null, 2))
  next()
})

// Add your routes here

router.post("/beta/v11/enter-location-uk-post/", (req, res) => {
  const liveInEngland = req.session.data['location-england']
  if (liveInEngland === 'No') {
    res.redirect('location-kickout-uk');
  } else {
    // res.redirect('baby-loss-in-england')
    res.redirect('living-in-england');
  }
})

router.post("/beta/v11/baby-loss-in-england-post/", (req, res) => {
  const lossInEngland = req.session.data['loss-in-england']
  if (lossInEngland === 'No') {
    res.redirect('location-kickout');
  } else {
    res.redirect('loss-in-5-years');
  }
})

router.post("/beta/v11/loss-in-5-years-post/", (req, res) => {
  const lossInYears = req.session.data['over-5-years']
  if (lossInYears === 'No') {
    res.redirect('date-of-loss-kickout');
  } else {
    res.redirect('relation-to-baby');
  }
})

router.post("/beta/v11/relation-to-baby-post/", (req, res) => {
  const relationship = req.session.data['relation-baby']
  if (relationship === 'None of these') {
    res.redirect('relation-kickout')
  } else {
    res.redirect('nhs-number')
  }
})

router.post("/beta/v11/nhs-number-post/", (req, res) => {
  const NHSNumber = req.session.data['knows-nhs-number']
  if (NHSNumber === 'No') {
    res.redirect('what-is-your-name');
  } else {
    res.redirect('enter-nhs-number');
  }
})

router.post("/beta/v11/enter-date-of-birth/", (req, res) => {
  res.redirect('enter-date-of-birth');
})

router.post("/beta/v11/enter-date-of-birth-parent/", (req, res) => {
  res.redirect('enter-date-of-birth-parent');
})

// set a variable once all demographic questions are asked
router.get("/beta/v11/check-your-details/", function (req, res) {
  req.session.data['checkpage-reached'] = "true"
  return res.render('beta/v11/check-your-details')
})

// Obfuscate the UR participants contact details for display on the page
router.get('/beta/v11/get-security-code', function (req, res) {
  console.log(process.env[req.session.data['ur']+'_EMAIL'])
  if (req.session.data['ur']) {

    let email = process.env[req.session.data['ur']+'_EMAIL']
    console.log(email)
    // create an obfuscated version of it
    if (email ) {
      emailObf = obfuscatorEmail(email)
    } else {
      // create a placeholder string as the field wasn't filled in properly
      emailObf = 'a********@gmail.com'
    }

    req.session.data['emailAddress'] = email
    req.session.data['emailAddressObf'] = emailObf

    // pull in mobile number from environmant variable and create an obsfucated version
    let mobile = process.env[req.session.data['ur']+'_MOBILE']

    // create an obfuscated version of it
    if (mobile && mobile.length === 11 ) {
      mobileObf = '*******' + mobile.substr(-4)
    } else {
      // create a placeholder string as the field wasn't filled in properly
      mobileObf = '*******6789'
    }
    req.session.data['mobileNum'] = mobile
    req.session.data['mobileNumObf'] = mobileObf

    return res.render('beta/v11/get-security-code', {
      'email': emailObf,
      'mobile': mobileObf
    })

  } else {
    // do nothing
    mobileObf = '*******6789'
    emailObf = 'Sa********@gmail.com'

    return res.render('beta/v11/get-security-code', {
      'email': emailObf,
      'mobile': mobileObf
    })
  }
})

// Obfuscate the UR participants contact details for display on the page
router.get('/beta/v11/enter-security-code', function (req, res) {
  if (req.session.data['ur']) {

    let email = process.env[req.session.data['ur']+'_EMAIL']

    // create an obfuscated version of it
    if (email) {
      emailObf = obfuscatorEmail(email)
    } else {
      // create a placeholder string as the field wasn't filled in properly
      emailObf = '*******6789'
    }

    req.session.data['emailAddress'] = email
    req.session.data['emailAddressObf'] = emailObf

    // pull in mobile number from environmant variable and create an obsfucated version
    let mobile = process.env[req.session.data['ur']+'_MOBILE']

    // create an obfuscated version of it
    if (mobile && mobile.length === 11 ) {
      mobileObf = '*******' + mobile.substr(-4)
    } else {
      // create a placeholder string as the field wasn't filled in properly
      mobileObf = '*******6789'
    }
    req.session.data['mobileNum'] = mobile
    req.session.data['mobileNumObf'] = mobileObf

    return res.render('beta/v11/enter-security-code', {
      'email': emailObf,
      'mobile': mobileObf
    })
  } else {
    // do nothing
    mobileObf = '*******6789'
    emailObf = 'Sa********@gmail.com'
    return res.render('beta/v11/enter-security-code', {
      'email': emailObf,
      'mobile': mobileObf
    })
  }
})

router.post('/beta/v11/get-security-code-post', function (req, res) {

  let contactMethod = req.session.data['otp-delivery']

  // generate a random 6 digit number for the Email
  var pinCode1 = Math.floor(100 + Math.random() * 900)
  var pinCode2 = Math.floor(100 + Math.random() * 900)
  var personalisation = {
    'one-time-passcode': pinCode1 + "" + pinCode2
  }

  if (contactMethod === 'email'){
    if (req.session.data['emailAddress'] !== '') {
      notify.sendEmail(
        '6c08059e-05b3-4ec1-b896-51236f9d3a4c',
        req.session.data['emailAddress'],
        { personalisation: personalisation }
      ).catch(err => console.error(err))
    }
  } else {
    if (req.session.data['mobileNum'] !== '') {
      notify.sendSms(
        '03839307-0359-4e34-9cea-6553a72f7ce9',
        req.session.data['mobileNum'],
        { personalisation: personalisation }
      ).catch(err => console.error(err))
    }
  }
  res.redirect('enter-security-code')
})

router.get('/beta/v11/confirm-postal-address', function (req, res) {
  if (req.session.data['ur']) {

    let name = process.env[req.session.data['ur']+'_NAME']
    console.log(name)

    req.session.data['fullName'] = name

    return res.render('beta/v11/confirm-postal-address', {
      'fullName': name
    })

  } else {
    // do nothing
    return res.render('beta/v11/confirm-postal-address')
  }
})

router.post("/beta/v11/confirm-postal-address-post/", (req, res) => {
  const address = req.session.data['address-ok']
  if (address === 'No') {
    res.redirect('check-your-address-kickout');
  } else {
    res.redirect('add-parent');
  }
})

router.post("/beta/v11/babys-details-post/", (req, res) => {
  const details = req.session.data['baby-details']
  if (details.includes("None")) {
    res.redirect('contact-email');
  } else {
    res.redirect('add-baby-details');
  }
})

router.post("/beta/v11/babys-details-steps-post/", (req, res) => {
  let details = []
  details = req.session.data['baby-details'] || []
  if (details.includes('None')) {
    res.redirect('contact-email');
  } else {
    if (details.includes("Date of loss")) {
      res.redirect('date-of-loss');
    } else if (details.includes("Place of loss")) {
      res.redirect('place-of-loss');
    } else if (details.includes("Sex")) {
      res.redirect('enter-baby-gender');
    } else if (details.includes("Name")) {
      res.redirect('enter-baby-name');
    } else {
      res.redirect('date-of-loss');
    }
  }
})

router.post("/beta/v11/date-of-loss-post/", (req, res) => {
  let details = req.session.data['baby-details'] || []

  if (details === []) {
    res.redirect('place-of-loss');
  } else {
    if (details.includes("Place of loss")) {
      res.redirect('place-of-loss');
    } else if (details.includes("Sex")) {
      res.redirect('enter-baby-gender');
    } else if (details.includes("Name")) {
      res.redirect('enter-baby-name');
    } else {
      res.redirect('contact-email');
    }
  }
})

router.post("/beta/v11/place-of-loss-post/", (req, res) => {
  const details = req.session.data['baby-details']
  if (details === []) {
    res.redirect('enter-baby-gender');
  } else {
    if (details.includes("Sex")) {
      res.redirect('enter-baby-gender');
    } else if (details.includes("Name")) {
      res.redirect('enter-baby-name');
    } else {
      res.redirect('contact-email');
    }
  }
})

router.post("/beta/v11/enter-baby-gender-post/", (req, res) => {
  const details = req.session.data['baby-details']
  if (!details.includes("Name")) {
    res.redirect('contact-email');
  } else {
    res.redirect('enter-baby-name');
  }
})


router.post("/beta/v11/add-parent-post/", (req, res) => {
  const addOther = req.session.data['add-other-parent']
  const steps = req.session.data['use-steps']

  if (addOther === 'No') {
    if (steps === 'false') {
      res.redirect('babys-details-2');
    } else {
      res.redirect('babys-details-steps');
    }
  } else {
    res.redirect('what-happens-next');
  }
})

router.post("/beta/v11/second-relation-to-baby-post/", (req, res) => {
  const steps = req.session.data['use-steps']

  if (steps === 'false') {
    res.redirect('babys-details-2');
  } else {
    res.redirect('babys-details-steps');
  }
})

router.post("/beta/v11/sex-of-baby-post/", (req, res) => {
  const addSex = req.session.data['add-sex']
  if (addSex === 'No' || addSex === 'I do not know the sex of my baby') {
    res.redirect('babys-name');
  } else {
    res.redirect('enter-baby-gender');
  }
})

// set a variable once all questions are asked
router.get("/beta/v11/check-your-answers/", function (req, res) {
  req.session.data['answerpage-reached'] = "true"
  return res.render('beta/v11/check-your-answers')
})

///// PARENT 2 /////

router.post("/beta/v11/parent2/nhs-number-post/", (req, res) => {
  const NHSNumber = req.session.data['knows-nhs-number']
  if (NHSNumber === 'No') {
    res.redirect('what-is-your-name');
  } else {
    res.redirect('enter-nhs-number');
  }
})

router.post("/beta/v11/parent2/enter-date-of-birth/", (req, res) => {
  res.redirect('enter-date-of-birth');
})

// set a variable once all demographic questions are asked
router.get("/beta/v11/parent2/check-your-details/", function (req, res) {
  req.session.data['checkpage-reached'] = "true"
  return res.render('beta/v11/parent2/check-your-details')
})

router.post("/beta/v11/parent2/get-security-code-post/", (req, res) => {
  res.redirect('enter-security-code');
})

router.post("/beta/v11/parent2/check-your-answers-post/", (req, res) => {
  const correct = req.session.data['cya-correct']
  if (correct === 'No') {
    res.redirect('check-answers-kickout-copy');
  } else {
    res.redirect('declaration');
  }
})

router.post("/beta/v11/parent2/check-answers-kickout-post/", (req, res) => {
  const sure = req.session.data['cya-kickout']
  if (sure === 'No') {
    res.redirect('check-your-answers');
  } else {
    res.redirect('check-answers-kickout');
  }
})

module.exports = router;