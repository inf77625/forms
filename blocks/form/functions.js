/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
* Masks the first 5 digits of the mobile number with *
* @param {*} mobileNumber
* @returns {string} returns the mobile number with first 5 digits masked
*/
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }
  const value = mobileNumber.toString();
  // Mask first 5 digits and keep the rest
  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}

function calcEmi(loan_amount, rate_of_interest, loan_tenure, tax_amount) {
  const P = Number(loan_amount || 0);
  const N = Number(loan_tenure || 0);
  const r = Number(rate_of_interest || 0) / 1200; // monthly rate in decimal

  if (!P || !N) return 0;
  let emi;
  if (r === 0) {
    emi = Math.round(P / N);
  } else {
    const pow = Math.pow(1 + r, N);
    emi = (P * r * pow) / (pow - 1);
    emi = Math.round(emi);
  }
  emi += Number(tax_amount || 0);
  return emi;
}

function getLoan(loanamount){
  return loanamount;
}
function getTenure(tenure){
  return tenure;
}
function getRoi(roi){
  return roi;
}
function getEmi(emi){
  return emi;
}
function getTax(tax){
  return tax;
}
 

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber, calcEmi, getLoan, getTenure, getRoi, getEmi, getTax,
};


function calcEmi(loan_amount, rate_of_interest, loan_tenure, tax_amount) {
  void tax_amount;
  const P = Number(loan_amount || 0);
  const N = Number(loan_tenure || 0);
  const rateValue = typeof rate_of_interest === 'string' ? rate_of_interest.replace('%', '') : rate_of_interest;
  const r = Number(rateValue || 0) / 1200; // monthly rate in decimal

  if (!P || !N || Number.isNaN(r)) return 0;
  let emi;
  if (r === 0) {
    emi = Math.round(P / N);
  } else {
    const pow = Math.pow(1 + r, N);
    emi = (P * r * pow) / (pow - 1);
    emi = Math.round(emi);
  }
  return emi;
}

function getLoan(loanamount, taxamount = 0){
  if (loanamount === null || loanamount === undefined || loanamount === '') {
    return '';
  }

  const loanValue = Number(loanamount);
  const taxValue = Number(taxamount || 0);

  if (Number.isNaN(loanValue)) {
    return '';
  }

  const totalLoanAmount = loanValue + (Number.isNaN(taxValue) ? 0 : taxValue);
  return `₹${totalLoanAmount}`;
}
function getTenure(tenure){

  return tenure;
}
function getRoi(roi){
 
  return roi;
}
function getEmi(emi){
  return `₹${emi}`;
}
function getTax(tax){
  return `₹${tax}`;
}