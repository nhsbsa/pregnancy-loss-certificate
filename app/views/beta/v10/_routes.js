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
  const liveInEngland = req.session.data['location-england']
  if (liveInEngland === 'No') {
    res.redirect('location-kickout-uk');
  } else {
    res.redirect('baby-loss-in-england')
  }
})

router.post("/beta/v10/baby-loss-in-england-post/", (req, res) => {
  const lossInEngland = req.session.data['loss-in-england']
  if (lossInEngland === 'No') {
    res.redirect('location-kickout');
  } else {
    res.redirect('living-in-england');
  }
})

router.post("/beta/v10/living-in-england-post/", (req, res) => {
  const livingInEngland = req.session.data['living-in-england']
  if (livingInEngland === 'No') {
    res.redirect('living-in-england-kickout');
  } else {
    res.redirect('loss-in-5-years');
  }
})

router.post("/beta/v10/loss-in-5-years-post/", (req, res) => {
  const lossInYears = req.session.data['over-5-years']
  if (lossInYears === 'No') {
    res.redirect('date-of-loss-kickout');
  } else {
    res.redirect('relation-to-baby');
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
  if (NHSNumber === 'No') {
    res.redirect('what-is-your-name');
  } else {
    res.redirect('enter-nhs-number');
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
  if (address === 'No') {
    res.redirect('check-your-address-kickout');
  } else {
    res.redirect('what-happens-next');
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

///// PARENT 2 /////

router.post("/beta/v10/parent2/nhs-number-post/", (req, res) => {
  const NHSNumber = req.session.data['knows-nhs-number']
  if (NHSNumber === 'No') {
    res.redirect('what-is-your-name');
  } else {
    res.redirect('enter-nhs-number');
  }
})

router.post("/beta/v10/parent2/enter-date-of-birth/", (req, res) => {
  res.redirect('enter-date-of-birth');
})

// set a variable once all demographic questions are asked
router.get("/beta/v10/parent2/check-your-details/", function (req, res) {
  req.session.data['checkpage-reached'] = "true"
  return res.render('beta/v10/parent2/check-your-details')
})

router.post("/beta/v10/parent2/get-security-code-post/", (req, res) => {
  res.redirect('enter-security-code');
})

router.post("/beta/v10/parent2/check-your-answers-post/", (req, res) => {
  const correct = req.session.data['cya-correct']
  if (correct === 'No') {
    res.redirect('check-answers-kickout-copy');
  } else {
    res.redirect('declaration');
  }
})

router.post("/beta/v10/parent2/check-answers-kickout-post/", (req, res) => {
  const sure = req.session.data['cya-kickout']
  if (sure === 'No') {
    res.redirect('check-your-answers');
  } else {
    res.redirect('check-answers-kickout');
  }
})

module.exports = router;