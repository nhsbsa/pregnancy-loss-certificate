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

router.post(/ccslocation-uk/, (req, res) => {

  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const lossInuk = req.session.data['location']

  if (lossInuk == 'yes') {
    res.redirect('enter-address');
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

router.post(/backoffice-date-ofbirth/, (req, res) => {

  const day = req.session.data['dob-day']
  const month = req.session.data['dob-month']
  const year = req.session.data['dob-year']

  const dob = day + '/' + month + '/' + year

  if (dob == '27/3/2007') {
    res.redirect('identity-doc');
  } else {
    res.redirect('date-of-birth-kickout');
}

})

router.post(/backoffice-relationbaby/, (req, res) => {

  const FirstRelationBaby = req.session.data['backoffice-relationbaby']

  if (FirstRelationBaby == 'no') {
      res.redirect('relation-kickout')
  } else {
      res.redirect('what-is-your-name')
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
    res.redirect('check-your-details');
  }

})
router.post(/backofficeparent-add/, (req, res) => {

  // if user wants their baby gender included in the certificate they will select yes then it 
  //will take them to enter baby gender name
  const AddbackofficeParent = req.session.data['otherparent']

  if (AddbackofficeParent == 'yes') {
    res.redirect('second-relation-to-baby');
  } else {
    res.redirect('identity-doc-copy');
  }

})

router.post(/address-postcode/, (req, res) => {

  const AddressPostcode = req.session.data['postcodeinput']

  if (AddressPostcode == 'NE1 3JA') {
    res.redirect('nhs-number');
  } else if (AddressPostcode == 'NE1 4XL') {
    res.redirect('address-list')
  } else {
    res.redirect('location-kickout-uk');
  }

})




// router.post(/baby-loss-date/, (req, res) => {

//   // creating a variable named lossInEngland, assigning the variable the value of the input (location)
//   // lossInEngland = location (value)
//   const BabyLossDate = req.session.data['date']

//   if (BabyLossDate == 'yes') {
//     res.redirect('relation-to-baby');
//   } else {
//     res.redirect('date-of-loss-kickout');
//   }

// })





module.exports = router;