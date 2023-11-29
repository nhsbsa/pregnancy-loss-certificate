const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add the filter to Nunjucks
addFilter('formatUKPostcode', function (content) {
  // Remove any non-alphanumeric characters and convert to uppercase
  let cleanContent = content.replace(/[^a-z0-9]/gi, '').toUpperCase();

  // Regular expression for UK postcode
  const regex = /^([A-Z]{1,2}[0-9][0-9A-Z]?)([0-9][A-Z]{2})$/;

  // Check if the cleaned content matches the pattern
  const match = cleanContent.match(regex);
  if (match) {
    // Format and return the postcode
    return match[1] + " " + match[2];
  }

  // If it doesn't match the pattern, return the original content
  return content;
});