import { calcEmi } from '../../functions.js';

export function handleAccordionNavigation(panel, tab, forceOpen = false) {
  const accordionTabs = panel?.querySelectorAll(':scope > fieldset');
  accordionTabs.forEach((otherTab) => {
    if (otherTab !== tab) {
      otherTab.classList.add('accordion-collapse');
    }
  });
  if (forceOpen) {
    tab.classList.remove('accordion-collapse');
  } else {
    tab.classList.toggle('accordion-collapse');
  }
}

export default function decorate(panel) {
  panel.classList.add('accordion');
  const accordionTabs = panel?.querySelectorAll(':scope > fieldset');
  accordionTabs?.forEach((tab, index) => {
    tab.dataset.index = index;
    const legend = tab.querySelector(':scope > legend');
    legend?.classList.add('accordion-legend');
    if (index !== 0) tab.classList.toggle('accordion-collapse'); // collapse all but the first tab on load
    legend?.addEventListener('click', () => {
      handleAccordionNavigation(panel, tab);
    });
  });
  return panel;
}

async function populateFields() {
  try {
    const response = await fetch('https://free.mockerapi.com/mock/184e2646-0656-4f1c-a856-1ce971b4ae97');
    const data = await response.json();
    
    let loanAmount = data?.responseString?.OfferDemogDetails?.[0]?.offerAmount || 0;
    let rate = data?.responseString?.OfferDemogDetails?.[0]?.rateOfInterest || 0;
    let month = data?.responseString?.OfferDemogDetails?.[0]?.tenure || 0;

    
    if (typeof rate === 'string') {
      rate = rate.replace('%', '');
    }
    loanAmount = Number(loanAmount);
    rate = Number(rate);
    month = Number(month);
    console.log('loanAmount:', loanAmount, 'rate:', rate, 'month:', month);
    const emi = calcEmi(loanAmount, rate, month);
    console.log('emi:', emi);
    const emiField = document.querySelector('.field-emi-amount p');
    if (emiField) {
      const br = emiField.querySelector('br');
      if (br) {
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
          br.nextSibling.textContent = '';
        }
        br.after(document.createTextNode(emi));
      }
    }

    const fullName = data?.responseString?.OfferDemogDetails?.[0]?.customerFirstName + data?.responseString?.OfferDemogDetails?.[0]?.customerLastName;
    console.log(fullName);
    const nameField = document.querySelector('.field-full-name p');
    if (nameField) {
      const br = nameField.querySelector('br'); 
      if (br) { 
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) { 
          br.nextSibling.textContent = '';
        }
        br.after(document.createTextNode(fullName));
      }
    }
    const mobileNumber = data?.responseString?.OfferDemogDetails?.[0]?.customerMobileNo;
    const number = document.querySelector('.field-mobile-number p');
    if (number) {
      const br = number.querySelector('br');
      if (br) {
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
          br.nextSibling.textContent = '';
        }
        br.after(document.createTextNode(mobileNumber));
      }
    }
    const dob = data?.responseString?.OfferDemogDetails?.[0]?.dateOfBirth;
    const dobField = document.querySelector('.field-date-of-birth p');
    if (dobField) {
      const br = dobField.querySelector('br');  
      if (br) {
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
          br.nextSibling.textContent = '';
        }
        br.after(document.createTextNode(dob));
      }
    }
    const address = data?.responseString?.OfferDemogDetails?.[0]?.customerAddress1 + ' ' + data?.responseString?.OfferDemogDetails?.[0]?.customerAddress2 + ' ' + data?.responseString?.OfferDemogDetails?.[0]?.customerCity + ' ' + data?.responseString?.OfferDemogDetails?.[0]?.customerState + ' ' + data?.responseString?.OfferDemogDetails?.[0]?.zipCode;
    const addressField = document.querySelector('.field-current-address p');
     if(addressField){
      const br = addressField.querySelector('br');
      if (br) {
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
          br.nextSibling.textContent = '';
        }
        br.after(document.createTextNode(address));
      }
     }


    const offerAmount = data?.responseString?.OfferDemogDetails?.[0]?.offerAmount;
    if (offerAmount) {
      // Format as currency if needed
      const formatted = Number(offerAmount).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
      // Find the element where you want to insert the offer amount
      const offerAmountElem = document.querySelector('.field-loan-amount p');
      if (offerAmountElem) {
        const br = offerAmountElem.querySelector('br');
        if (br) {
          // Remove any text node after <br>
          if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
            br.nextSibling.textContent = '';
          }
          // Insert the formatted offer amount after <br>
          br.after(document.createTextNode(formatted));
        }
      }
    }

    const tenure = data?.responseString?.OfferDemogDetails?.[0]?.tenure;
    // Find the element where you want to insert the tenure
    const tenureField = document.querySelector('.field-tenure p');
    if (tenureField) {
      const br = tenureField.querySelector('br');
      if (br) {
        // Remove any text node after <br>
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
          br.nextSibling.textContent = '';
        }
        // Insert the tenure after <br>
        br.after(document.createTextNode(tenure + ' months'));
      }
    }

    const rateOfInterest = data?.responseString?.OfferDemogDetails?.[0]?.rateOfInterest;
    const rateField = document.querySelector('.field-rate-of-interest p');
    if (rateField) {
      const br = rateField.querySelector('br'); 
      if (br) {
        if (br.nextSibling && br.nextSibling.nodeType === Node.TEXT_NODE) {
          br.nextSibling.textContent = '';
        } 
        br.after(document.createTextNode(rateOfInterest ));
      }
    }
  } catch (e) {
    console.error('Failed to fetch offer amount:', e);
  }
}


populateFields();

