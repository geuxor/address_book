const submitButton = document.querySelector('.btn-primary');
submitButton.disabled = true;
const allInputs = document.querySelectorAll(".form-control");
const zipCodeInput = document.querySelector('#zipcode');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const booklist = document.querySelector('#booklist');
const firstnameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const addressInput = document.querySelector('#address');
const countryInput = document.querySelector('#country');
const cityInput = document.querySelector('#city');
const contactdiv = document.querySelector('.contact');
let bookListObj = {};
const myDirectory = [];

// Validation
const addValidationClasses = (input, isValid) => {
  if (input.value === "") {
    input.classList.remove('is-valid');
    return;
  }
  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
};

const validInput = ((input) => {
  if (input.value !== "") {
    addValidationClasses(input, true);
    return true;
  }
  return false;
});

const clearInput = ((input) => {
  addValidationClasses(input, false);
});

const validZipCode = (input) => {
  let isValid = /^\d{4,8}$/.test(input.value);
  if (input.value === "") {
    isValid = true;
  }
  addValidationClasses(input, isValid);
  return isValid;
};

const validEmail = (input) => {
  let isValid = /^\w+@\w+(\.\w{2,6})+$/.test(input.value);
  if (input.value === "") {
    isValid = true;
  }
  addValidationClasses(input, isValid);
  return isValid;
};

const validPhoneNumber = (input) => {
  let isValid = /^.\d{6,20}$/.test(input.value);
  if (input.value === "") {
    isValid = true;
  }
  addValidationClasses(input, isValid);
  return isValid;
};

const enableButton = () => {
  const firstnameIsValid = validInput(firstnameInput);
  const lastnameIsValid = validInput(lastnameInput);
  const addressIsValid = validInput(addressInput);
  const zipCodeIsValid = validZipCode(zipCodeInput);
  const cityIsValid = validInput(cityInput);
  const countryIsValid = validInput(countryInput);
  const emailIsValid = validEmail(emailInput);
  const phoneIsValid = validPhoneNumber(phoneInput);

  if (firstnameIsValid && zipCodeIsValid && emailIsValid && phoneIsValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

allInputs.forEach((input) => {
  input.addEventListener('blur', enableButton);
});

// delete and update functions
const deleteCtc = () => {
  document.querySelectorAll("#delete").forEach((ctc) => {
    ctc.addEventListener("click", (event) => {
      event.currentTarget.parentElement.remove();
      const contactNr = event.currentTarget.parentElement.id.slice(3);
      delete myDirectory[contactNr - 1];
    });
  });
};

function populate(frm, data) {
  $.each(data, function (key, value) {
    $('[name=' + key + ']', frm).val(value);
  });
}

const updateCtc = () => {
  document.querySelectorAll("#update").forEach((ctc) => {
    ctc.addEventListener("click", (event) => {
      const contactId = event.currentTarget.parentElement.innerText.split("-")[0];
      const populateContact = myDirectory[parseInt(contactId, 0) - 1];
      populate("#ctcForm", populateContact)
      event.currentTarget.parentElement.remove();
      const contactNr = event.currentTarget.parentElement.id.slice(3);
    });
  });
};

// display contact
const displayContact = (array) => {
  const div = document.createElement('div');
  const lastItem = array[array.length - 1];
  const values = Object.values(lastItem);
  const keys = Object.keys(lastItem);
  div.append(document.createTextNode(`${array.length}- `));

  keys.forEach((contactField, key) => {
    if (contactField !== "") {
      switch (contactField) {
        case "firstname":
          div.append(document.createTextNode(`${values[key]} `));
          break;
        case "zipcode":
          div.append(document.createTextNode(`${values[key]} `));
          break;
        case "email":
          $(div).append(`<i class="fieldicon fas fa-envelope"> </i>`);
          div.append(document.createTextNode(` ${values[key]}, `));
          break;
        case "phone":
          $(div).append(`<i class="fieldicon fas fa-phone-alt"> </i>`);
          div.append(document.createTextNode(` ${values[key]}.`));
          break;
        default:
          div.append(document.createTextNode(`${values[key]}, `));
      }
    }
    booklist.appendChild(div);
    div.setAttribute("class", "contact");
    div.setAttribute("id", `ctc${array.length}`);
  });
  $(div).append(`<a href="#" class="icons" id="delete"><i class="fas fa-trash"></i></a>`);
  $(div).append(`<a href="#" class="icons" id="update"><i class="fas fa-pen"></i></a></div>`);
  deleteCtc();
  updateCtc();
};

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  bookListObj = {};
  bookListObj.firstname = firstnameInput.value;
  bookListObj.lastname = lastnameInput.value;
  bookListObj.address = addressInput.value;
  bookListObj.zipcode = zipCodeInput.value;
  bookListObj.city = cityInput.value;
  bookListObj.country = countryInput.value;
  bookListObj.email = emailInput.value;
  bookListObj.phone = phoneInput.value;
  myDirectory.push(bookListObj);
  displayContact(myDirectory);
  $("#ctcForm")[0].reset();
  enableButton();
  clearInput(firstnameInput);
  clearInput(lastnameInput);
  clearInput(addressInput);
  clearInput(cityInput);
  clearInput(countryInput);
});
