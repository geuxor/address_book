const allInputs = document.querySelectorAll(".form-control");
const zipCodeInput = document.querySelector('#zip_code');
const emailInput = document.querySelector('#email');
const mobileInput = document.querySelector('#mobile_phone');
const phoneInput = document.querySelector('#home_phone');
const submitButton = document.querySelector('.btn-primary');
const addresslist = document.querySelector('#addresslist')
const firstnameInput = document.querySelector('#first_name');
const lastnameInput = document.querySelector('#last_name');
const addressInput = document.querySelector('#address');
const countryInput = document.querySelector('#country');
const cityInput = document.querySelector('#city');
const delbtn = document.querySelector('#delElement');

// Mark an input as valid or invalid with Boostrap validation classes
const addValidationClasses = (input, isValid) => {
  if (input.value === "") {
    return;
  }
  //console.log(`${input.value} is really ${isValid}`);
  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
};


// Test methods

// All fields are required
const allFilled = (inputs) => {
  // Check that the value of every input is not an empty string
  return inputs.every((input) => {
    console.log(`input ${input}`);
    // return input.value !== "";
    if (input.value !== "") {
      console.log(`${input.value} not empty`);
      addValidationClasses(input, true)
      return true;
    } else {
      console.log(`${input.value} is empty`);
      return false;
    }
  });
};

// Ensure the Terms of Service checkbox is ticked
const checkboxChecked = (input) => {
  return input.checked;
};

const validInput = ((input) => {
  console.log(input.value);
  
  if (input.value !== "") {
    addValidationClasses(input, true);
    return true;
  } else {
    return false;
  }
});

// Ensure the user enters a valid  zipcode
const validZipCode = (input) => {
  const isValid = /^\d{4,8}$/.test(input.value);
  addValidationClasses(input, isValid);
  return isValid;
};



const validEmail = (input) => {
  const isValid = /^\w+@\w+(\.\w{2,6})+$/.test(input.value);
  addValidationClasses(input, isValid);
  return isValid;
};

// Validate the phone number.  mobile phones only
const validPhoneNumber = (input) => {
  const isValid = /^.\d{6,20}$/.test(input.value);
  addValidationClasses(input, isValid);
  return isValid;
};


// Launch all tests
const enableButton = () => {
  const firstnameIsValid = validInput(firstnameInput);
  const lastnameIsValid = validInput(lastnameInput);
  const addressIsValid = validInput(addressInput);
  const zipCodeIsValid = validZipCode(zipCodeInput);
  const cityIsValid = validInput(cityInput);
  const countryIsValid = validInput(countryInput);
  const emailIsValid = validEmail(emailInput);
  const mobileIsValid = validPhoneNumber(mobileInput);
  const phoneIsValid = validPhoneNumber(phoneInput);

  if (firstnameIsValid && mobileIsValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};



allInputs.forEach((input) => {
  input.addEventListener('blur', enableButton);
});

const addressListObj = {};

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('clicked.....................');
  console.log(firstnameInput.value);
  const newdiv = $("<li>");
  newdiv.html("xxxxxxxxxxxxxxxx");
  //setTimeout(() => { $("#addresslist").text(`Last msg from: ${firstnameInput.value}`); }, 1000);
  //setTimeout(() => { $("h3").text(`Last msg from: ${firstnameInput.value}`); }, 1000);
  //setTimeout(() => { $("#addresslist").append(newdiv); }, 1000);
  addressListObj["firstname"] = firstnameInput.value;
  addressListObj["lastname"] = lastnameInput.value;
  addressListObj["address"] = addressInput.value;
  addressListObj["zip"] = zipCodeInput.value;
  addressListObj["city"] = cityInput.value;
  addressListObj["country"] = countryInput.value;
  addressListObj["email"] = emailInput.value;
  addressListObj["mobile"] = mobileInput.value;
  addressListObj["phone"] = phoneInput.value;
  console.log(addressListObj);
  
  const newdivtext = (`- ${firstnameInput.value} ${lastnameInput.value} - ${addressInput.value} - ${countryInput.value}`);
  const newdiv1 = $(`<div id='object'>${newdivtext}<button id="delElement">y</button></div>`);
  
  $("#addresslist").append(newdiv1);


  firstnameInput.value = "";
  lastnameInput.value = "";
  addressInput.value = "";
  zipCodeInput.value = "";
  cityInput.value = "";
  countryInput.value = "";
  emailInput.value = "";
  mobileInput.value = "";
  phoneInput.value = "";
});

// delbtn.addEventListener('click', (event) => {
//   console.log(delbtn);
  
// alert("x");
// }) 

const delElement = () => {
  $(this).slideUp();
  $(this).remove();
  $("#object").remove(":contains(firstnameInput.value)");
}
$("#object").click(delElement);

// $("#object").click(function () {
//   console.log('xxxxxxxxxxxxxxxxxxxxxx');
// });
