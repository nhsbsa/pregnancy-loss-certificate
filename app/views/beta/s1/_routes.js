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
    res.redirect('enter-location');
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

router.post(/date-of-birth/, (req, res) => {

  const day = req.session.data['dob-day']
  const month = req.session.data['dob-month']
  const year = req.session.data['dob-year']

  const dob = day + '/' + month + '/' + year

  if (dob == '27/3/2007') {
    res.redirect('enter-address');
  } else if (dob== '27/03/2007') {
    res.redirect('enter-address')
  } else {
    res.redirect('date-of-birth-kickout');
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

router.post(/added-parent/, (req, res) => {

  const SecondParent = req.session.data['parent-2']

  if (SecondParent == 'no') {
      res.redirect('second-parent-kickout')
  } else {
      res.redirect('second-parent')
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




router.post(/nhs-number-action/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const NHSNumber = req.session.data['nhs']

  if (NHSNumber == 'yes') {
    res.redirect('enter-nhs-number');
  } else {
    res.redirect('what-is-your-name');
  }

})
router.post(/parent-add/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const AddParent = req.session.data['parent']

  if (AddParent == 'yes') {
    res.redirect('nhs-number-copy');
  } else {
    res.redirect('check-your-answers');
  }

})

router.post(/parent-postcode/, (req, res) => {

  const AddressPostcode = req.session.data['postcodeinput']

  if (AddressPostcode == 'NE1 3JA') {
    res.redirect('check-their-details');
  } else if (AddressPostcode == 'ne1 3ja') {
    res.redirect('check-their-details')
  } else if (AddressPostcode == 'ne13ja') {
    res.redirect('check-their-details')
  } else {
    res.redirect('check-their-details-copy');
  }

})

router.post(/security-code/, (req, res) => {

  const SecurityCode = req.session.data['entercode']

  if (SecurityCode == '123') {
    res.redirect('check-your-details-nhs');
  } else if (SecurityCode == '1234') {
    res.redirect('check-your-details-no-nhs')
  } else {
    res.redirect('check-your-details-copy');
  }

})
router.post(/check-details/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const checkDetails = req.session.data['details']

  if (checkDetails == 'yes') {
    res.redirect('add-parent');
  } else {
    res.redirect('check-your-details-kickout');
  }

})

router.post(/enter-your-name/, (req, res) => {

  res.redirect('enter-date-of-birth')

})


router.post(/enter-parent-name/, (req, res) => {

  res.redirect('enter-date-of-birth-copy')

})

// second parent 



router.post(/parent-nhs-number/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const parentNHSNumber = req.session.data['nhs']

  if (parentNHSNumber == 'yes') {
    res.redirect('enter-nhs-number-copy');
  } else {
    res.redirect('second-parent');
  }

})

router.post(/parent-dob/, (req, res) => {

  const day = req.session.data['dob-day']
  const month = req.session.data['dob-month']
  const year = req.session.data['dob-year']

  const dob = day + '/' + month + '/' + year

  if (dob == '27/3/2007') {
    res.redirect('enter-address-copy');
  } else if (dob== '27/03/2007') {
    res.redirect('enter-address-copy')
  } else {
    res.redirect('date-of-birth-kickout');
}

})


router.post(/parental-kickout/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const nosecondparent = req.session.data['parentkickout']

  if ( nosecondparent == 'yes') {
    res.redirect('check-your-answers-copy');
  } else {
    res.redirect('parent-kickout-copy');
  }

})
module.exports = router;