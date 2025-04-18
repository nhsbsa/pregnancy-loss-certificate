const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// CRM V3 prototype

// Add your routes here

router.get('/crm/v3/search', function (req, res) {
  // check for clear
  if (req.query.clear === 'true') {
    req.session.data['reference-number'] = ''
    req.session.data['first-name'] = ''
    req.session.data['last-name'] = ''
    req.session.data['email'] = ''
    req.session.data['date-of-birth'] = []
    req.session.data['search-postcode'] = ''
  }
  let referenceNumber = req.session.data['reference-number'] || ''
  let firstName = req.session.data['first-name'] || ''
  let lastName = req.session.data['last-name'] || ''
  let email = req.session.data['email'] || ''
  let dobDay = ''
  let dobMonth = ''
  let dobYear = ''
  if (req.session.data['date-of-birth']) {
    dobDay = req.session.data['date-of-birth'][0] || ''
    dobMonth = req.session.data['date-of-birth'][1] || ''
    dobYear = req.session.data['date-of-birth'][2] || ''
  }
  let searchPostcode = req.session.data['search-postcode'] || ''

  return res.render('/crm/v3/search', {
    'referenceNumber': referenceNumber,
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'dobDay': dobDay,
    'dobMonth': dobMonth,
    'dobYear': dobYear,
    'searchPostcode': searchPostcode
  })
})

// start page choice
router.post("/crm/v3/start-choice", function (req, res) {
  // grab choice
  let choice = req.session.data['start-choice']
  if (choice === 'status'){
    res.redirect('/crm/v3/search')
  } else if (choice === 'request'){
    res.redirect('/crm/v3/request')
  } else if (choice === 'request2'){
    res.redirect('/crm/v3/request2')
  }
});

router.post("/crm/v3/get-results", function (req, res) {
  // grab search type
  let type = []
  let term = ''
  // load all applications
  let applications = req.session.data['applications']
  console.log('applications: ' + applications.length)
  // create an empty array to store matching results
  let results = []

  if (req.session.data['reference-number']){
    type.push('refnum')
  }
  if (req.session.data['search-postcode']){
    type.push('postcode')
  }
  if (req.session.data['date-of-birth'][2]){
    type.push('dob')
  }
  if (req.session.data['first-name']){
    type.push('firstname')
  }
  if (req.session.data['last-name']){
    type.push('lastname')
  }
  if (req.session.data['email'][2]){
    type.push('email')
  }

  if (type.includes('refnum')) {
    console.log('searching ref number...')
    term = req.session.data['reference-number']
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].referenceNumber) {
        // we then pass all of the matches
        if (applications[i].referenceNumber === term) {
          results.push(i)
        }
      }
    }
  }
  else if (type.includes('lastname')) {
    console.log('searching last name...')
    term = req.session.data['last-name']
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].lastName) {
        // we then pass all of the matches
        if (applications[i].lastName === term) {
          results.push(i)
        }
      }
    }
  }
  else if (type.includes('postcode')) {
    console.log('searching postcode...')
    term = req.session.data['search-postcode']
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].postcode) {
        // we then pass all of the matches
        if (applications[i].postcode === term) {
          results.push(i)
        }
      }
    }
  }
  else if (type.includes('dob')) {
    console.log('searching basic details...')
    // turn entered date of birth into a string to compare
    term = req.session.data['date-of-birth'][2] + '-'+ req.session.data['date-of-birth'][1].padStart(2, '0') + '-'+ req.session.data['date-of-birth'][0].padStart(2, '0')
    console.log('term: ' + term)
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].dateOfBirth) {
        // we then pass all of the matches
        if (applications[i].dateOfBirth === term) {
          results.push(i)
        }
      }
    }
  }
  // push back data to the datastore
  req.session.data['search-term'] = term
  if (term !== '') {
    req.session.data['results'] = results
  } else {
    req.session.data['results'] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
  }
  // then return the user to the results page
  res.redirect('/crm/v3/results')
});

function compareStrings(a, b) {
  // allow case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

// build a function to sort the results into a different order
router.get('/crm/v3/results', function (req, res) {
  // check for data
  let resultsSorted = req.session.data['results']
  let results = ''
  //
  if (req.query.sorted) {
    var sorting = req.query.sorted
  }

  // resultsSorted.sort(function(a, b) {
  //   return compareStrings(a.lastName, b.lastName);
  // })

  return res.render('/crm/v3/results', {
    'results': resultsSorted
  })
})
router.post(/reissue-check-crm/, (req, res) => {

  const ReissueaCert = req.session.data['reissue-check-crm']

  if (ReissueaCert == 'no') {
      res.redirect('cert-det')
  } else {
      res.redirect('reissue')
  }

})

// V2 Prototype

// Add your routes here
router.post("/crm/v2/get-results", function (req, res) {
  // grab search type
  let type = req.session.data['search-type']
  let term = ''
  // load all applications
  let applications = req.session.data['applications']
  console.log('applications: ' + applications.length)
  // create an empty array to store matching results
  let results = []

  if (type === 'refnum') {
    console.log('searching ref number...')
    term = req.session.data['reference-number']
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].referenceNumber) {
        // we then pass all of the matches
        if (applications[i].referenceNumber === term) {
          results.push(i)
        }
      }
    }
  }
  else if (type === 'postcode') {
    console.log('searching postcode...')
    term = req.session.data['search-postcode']
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].postcode) {
        // we then pass all of the matches
        if (applications[i].postcode === term) {
          results.push(i)
        }
      }
    }
  }
  else if (type === 'basic') {
    console.log('searching basic details...')
    // turn entered date of birth into a string to compare
    term = req.session.data['date-of-birth'][2] + '-'+ req.session.data['date-of-birth'][1].padStart(2, '0') + '-'+ req.session.data['date-of-birth'][0].padStart(2, '0')
    console.log('term: ' + term)
    for (i = 0; i < applications.length; i++) {
      // avoid issues if we check if it's empty first
      if (applications[i].dateOfBirth) {
        // we then pass all of the matches
        if (applications[i].dateOfBirth === term) {
          results.push(i)
        }
      }
    }
  }
  // push back data to the datastore
  req.session.data['search-term'] = term
  if (term !== '') {
    req.session.data['results'] = results
  } else {
    req.session.data['results'] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
  }
  // then return the user to the results page
  res.redirect('/crm/v2/results2')
});

function compareStrings(a, b) {
  // allow case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

// build a function to sort the results into a different order
router.get('/crm/v2/results2', function (req, res) {
  // check for data
  let resultsSorted = req.session.data['results']
  let results = ''
  //
  if (req.query.sorted) {
    var sorting = req.query.sorted
  }

  // resultsSorted.sort(function(a, b) {
  //   return compareStrings(a.lastName, b.lastName);
  // })

  return res.render('/crm/v2/results2', {
    'results': resultsSorted
  })
})
router.post(/reissue-cert/, (req, res) => {
 
  // creating a variable named lossInEngland, assigning the variable the value of the input (location)
  // lossInEngland = location (value)
  const reissue = req.session.data['reissue-certificate']

  if (reissue == 'yes') {
    res.redirect('reissue');
  } else {
    res.redirect('cert-det');
  }

})





module.exports = router;