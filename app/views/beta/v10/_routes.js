const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

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

router.post("/beta/v10/enter-location-uk-post/", (req, res) => {
  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const liveInEngland = req.session.data['location-england']
  console.log(liveInEngland)
  if (liveInEngland === 'Yes') {
    res.redirect('baby-loss-in-england');
  } else {
    res.redirect('location-kickout-uk')
    console.log('what!')
  }
})

router.post("/beta/v10/baby-loss-in-england-post/", (req, res) => {
  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossInEngland = req.session.data['loss-in-england']
  if (lossInEngland === 'Yes') {
    res.redirect('living-in-england');
  } else {
    res.redirect('location-kickout');
  }
})

router.post("/beta/v10/living-in-england-post/", (req, res) => {
  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // livingInEngland = location (value)
  const livingInEngland = req.session.data['living-in-england']
  if (livingInEngland === 'Yes') {
    res.redirect('loss-in-5-years');
  } else {
    res.redirect('living-in-england-kickout');
  }
})


router.post("/beta/v10/loss-in-5-years-post/", (req, res) => {
  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossInYears = req.session.data['over-5-years']
  if (lossInYears === 'Yes') {
    res.redirect('relation-to-baby');
  } else {
    res.redirect('date-of-loss-kickout');
  }
})

router.post("/beta/v10/relation-to-baby-post/", (req, res) => {
  const relationship = req.session.data['relation-baby']
  if (relationship === 'None of these') {
    res.redirect('relation-kickout')
  } else {
    res.redirect('nhs-number')
  }
})

router.post("/beta/v10/nhs-number-post/", (req, res) => {
  const NHSNumber = req.session.data['knows-nhs-number']
  if (NHSNumber === 'Yes') {
    res.redirect('enter-nhs-number');
  } else {
    res.redirect('what-is-your-name');
  }
})

// set a variable once all demographic questions are asked
router.get("/beta/v10/check-your-details/", function (req, res) {
  req.session.data['checkpage-reached'] = "true"
  return res.render('beta/v10/check-your-details')
})

router.post("/beta/v10/get-security-code-post/", (req, res) => {
    res.redirect('enter-security-code');
})

router.post("/beta/v10/confirm-postal-address-post/", (req, res) => {
  const address = req.session.data['address-ok']
  if (address === 'Yes') {
    res.redirect('what-happens-next');
  } else {
    res.redirect('what-is-your-name');
  }
})

router.post("/beta/v10/add-parent-post/", (req, res) => {
  const addOther = req.session.data['add-other-parent']
  if (addOther === 'No') {
    res.redirect('date-of-loss');
  } else {
    res.redirect('what-is-their-name');
  }
})

router.post("/beta/v10/sex-of-baby-post/", (req, res) => {
  const addSex = req.session.data['add-sex']
  if (addSex === 'No') {
    res.redirect('babys-name');
  } else {
    res.redirect('enter-baby-gender');
  }
})

// set a variable once all questions are asked
router.get("/beta/v10/check-your-answers/", function (req, res) {
  req.session.data['answerpage-reached'] = "true"
  return res.render('beta/v10/check-your-answers')
})

router.post("/security-code/", (req, res) => {
  const SecurityCode = req.session.data['entercode']
  if (SecurityCode === '123') {
    res.redirect('check-your-details-nhs');
  } else if (SecurityCode === '1234') {
    res.redirect('check-your-details-nhs-option-2')
  } else {
    res.redirect('check-your-details-nhs-option-3');
  }
})



router.post("/check-details/", (req, res) => {
  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const parentcheckDetails = req.session.data['details']
  if (parentcheckDetails === 'yes') {
    res.redirect('add-parent-copy');
  } else {
    res.redirect('check-your-details-kickout');
  }
})

router.post("/enter-parent-name/", (req, res) => {
  res.redirect('date-of-loss')
})

router.post("/idv-other-email/", (req, res) => {
  const parentContact = req.session.data['contact']
  if (parentContact === 'yes') {
    res.redirect('enter-date-of-birth-parent');
  } else {
    res.redirect('parent-contact-kickout');
  }
})

module.exports = router;