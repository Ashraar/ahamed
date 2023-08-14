let selectedOptions;
const slAdultInput = document.getElementById('slAdult');
const slChildInput = document.getElementById('slChild');
const foreignerAdultInput = document.getElementById('foreignerAdult');
const foreignerChildInput = document.getElementById('foreignerChild');
const infantInput = document.getElementById('infant');

const incrementBtns = document.querySelectorAll('.incrementBtn');
const decrementBtns = document.querySelectorAll('.decrementBtn');

incrementBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const inputField = btn.previousElementSibling;
    inputField.value = parseInt(inputField.value) + 1;
    savelocal();
    createsummary();
  });
});

decrementBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const inputField = btn.nextElementSibling;
    if (parseInt(inputField.value) > 0) {
      inputField.value = parseInt(inputField.value) - 1;
      savelocal();
      createsummary();

    }
  });
});

function savelocal(){
  selectedOptions = {
    'Foreigner Adults': foreignerAdultInput.value,
    'Foreigner Child': foreignerChildInput.value,
    'SL Adults': slAdultInput.value,
    'SL Child': slChildInput.value,
    'Infant': infantInput.value
  };

  localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
}

//experiment

let selectedTimelines = [];
let peakhours = [];
let filteredSelectedTimelines = [];
const dropdownc = document.querySelector('.lists');


function handleCheckboxChange(checkbox) {
  const value = checkbox.value;
  if (checkbox.checked) {
    // Add the value to the array if the checkbox is checked
    selectedTimelines.push(parseInt(value));
  } else {
    // Remove the value from the array if the checkbox is unchecked
    const index = selectedTimelines.indexOf(parseInt(value));
    if (index !== -1) {
      selectedTimelines.splice(index, 1);
    }
  }

  // Numbers to remove
  const numbersToRemove = [4, 5, 6, 9, 10, 11];
  peakhours = selectedTimelines.filter(number => numbersToRemove.includes(number));
  filteredSelectedTimelines = selectedTimelines.filter(number => !numbersToRemove.includes(number));
  console.log("peakhours: " + peakhours)
  console.log("filteredSelectedTimelines: " + filteredSelectedTimelines)
  // You can do something with the selectedTimelines array here
  console.log(selectedTimelines);
  createsummary()
}

function createsummary() {
  // Get the date and time for the summary
  const date = "19/10/2023";
  const startTime = "10.00 am";
  const endTime = "12.00 am";
  const durationNormalHrs = filteredSelectedTimelines.length; //done
  const durationPeakHrs = peakhours.length; //done
   

  // Get the number of visitors in each category
  const foreignerAdults = parseInt(foreignerAdultInput.value);
  const foreignerChildren = parseInt(foreignerChildInput.value);
  const slAdults = parseInt(slAdultInput.value);
  const slChildren = parseInt(slChildInput.value);
  const infants = parseInt(infantInput.value);

  // Calculate the charges for each category
  const charges = {
    foreignerAdultNormal: 10,
    foreignerAdultPeak: 13,
    foreignerChildNormal: 5,
    foreignerChildPeak: 8,
    slAdultNormal: 4,
    slAdultPeak: 6,
    slChildNormal: 2,
    slChildPeak: 3,
  };

  // Calculate the charges for each category based on the number of normal and peak hours
  const foreignerAdultCharge = (charges.foreignerAdultNormal * durationNormalHrs) + (charges.foreignerAdultPeak * durationPeakHrs);
  const foreignerChildCharge = (charges.foreignerChildNormal * durationNormalHrs) + (charges.foreignerChildPeak * durationPeakHrs);
  const slAdultCharge = (charges.slAdultNormal * durationNormalHrs) + (charges.slAdultPeak * durationPeakHrs);
  const slChildCharge = (charges.slChildNormal * durationNormalHrs) + (charges.slChildPeak * durationPeakHrs);

  // Calculate the total charges for each category
  const totalForeignerAdultCharge = foreignerAdultCharge * foreignerAdults;
  const totalForeignerChildCharge = foreignerChildCharge * foreignerChildren;
  const totalSLAdultCharge = slAdultCharge * slAdults;
  const totalSLChildCharge = slChildCharge * slChildren;

  // Calculate the total payable amount
  const totalPayable = totalForeignerAdultCharge + totalForeignerChildCharge + totalSLAdultCharge + totalSLChildCharge;



  // Generate the summary text
  const summary = `
<table class="summarytent">
    <tr><td>Date:</td><td> ${date}</td></tr>
    <tr><td>Time:</td><td> ${startTime} to ${endTime}</td></tr>
    <tr><td>Duration:</td><td> ${durationNormalHrs} hrs (${durationNormalHrs} Normal : ${durationPeakHrs} Peak)</td></tr>
    <tr><th>Tickets</th><th>Charges</th></tr>
    <tr><td>${foreignerAdults} Foreigner Adult</td><td> $${totalForeignerAdultCharge}</td></tr>
    <tr><td>${foreignerChildren} Foreigner Child</td><td> $${totalForeignerChildCharge}</td></tr>
    <tr><td>${slAdults} SL Adult</td><td> $${totalSLAdultCharge}</td></tr>
    <tr><td>${slChildren} SL Child</td><td> $${totalSLChildCharge}</td></tr>
    <tr><td>${infants} Infant</td><td> Free</td></tr>
    <tr><th>Total Payable:</th><th>$${totalPayable}</th></tr>
</table>
`;

  document.getElementById("summarytbl").innerHTML = summary;
  // You can display the summary on the webpage or do whatever you want with it here

  // Save the summary table HTML to local storage with a key 'summaryTable'
  localStorage.setItem('summarytbl', summary);

}



/////////////////////////////////////////////////////////////////////
// Load and display the summary with user details on DOM content load
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the combined summary from local storage
  const combinedSummary = localStorage.getItem("summarytbl");

  // Display the combined summary on the webpage
  if (combinedSummary) {
    document.getElementById("summarytbl").innerHTML = combinedSummary;
  } else {
    // Handle the case where the summary is not available
    document.getElementById("summarytbl").innerHTML = "Summary not available.";
  }
});

/////////////////////////////////////////////////////////////////button disable//
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the input fields, checkboxes, and the submit button
  var foreignerAdultInput = document.getElementById("foreignerAdult");
  var foreignerChildInput = document.getElementById("foreignerChild");
  var slAdultInput = document.getElementById("slAdult");
  var slChildInput = document.getElementById("slChild");
  var infantInput = document.getElementById("infant");

  var checkboxes = document.querySelectorAll('input[name="timelines"]');
  var submitButton = document.getElementById("myButton");

  // Function to check if all input fields and checkboxes are filled and valid
  function validateInputs() {
    // Perform your validation logic here
    // For example, check if the input fields are not empty and contain valid values

    // For simplicity, let's assume we're only checking if the input fields are not empty
    var inputFieldsValid =
      foreignerAdultInput.value.trim() !== "" &&
      foreignerChildInput.value.trim() !== "" &&
      slAdultInput.value.trim() !== "" &&
      slChildInput.value.trim() !== "" &&
      infantInput.value.trim() !== "";

    // Check if at least one checkbox is checked
    var checkboxesValid = false;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesValid = true;
        break;
      }
    }

    // Enable the submit button only if all input fields and checkboxes are valid
    submitButton.disabled = !(inputFieldsValid && checkboxesValid);
  }

  // Add event listeners to input fields to trigger validation on input change
  foreignerAdultInput.addEventListener("input", validateInputs);
  foreignerChildInput.addEventListener("input", validateInputs);
  slAdultInput.addEventListener("input", validateInputs);
  slChildInput.addEventListener("input", validateInputs);
  infantInput.addEventListener("input", validateInputs);

  // Add event listeners to checkboxes to trigger validation on change
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", validateInputs);
  }

  // Add a click event listener to the button
  submitButton.addEventListener("click", function () {
    // Redirect to the desired HTML page
    window.location.href = "details.html";
  });

  // Add event listener for the form submission
  document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Store data in local storage
    const userData = {
      fullName: document.getElementById("fullName").value,
      countryCode: document.getElementById("countryCode").value,
      mobileNumber: document.getElementById("mobileNumber").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to payment.html
    window.location.href = "payment.html";
  });

});
/////////////////////////////////////////////////////////////detail page////////////////////
// JavaScript code to store user details in localStorage
document.addEventListener('DOMContentLoaded', function() {
  const userForm = document.getElementById('userForm');
  
  userForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting

      const fullName = document.getElementById('fullName').value;
      const mobileNumber = document.getElementById('mobileNumber').value;
      const email = document.getElementById('email').value;
      const confirmEmail = document.getElementById('confirmEmail').value;
      const gender = document.getElementById('gender').value;

      const userDetails = {
          fullName: fullName,
          mobileNumber: mobileNumber,
          email: email,
          confirmEmail: confirmEmail,
          gender: gender,
      };

      // Store the user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      // Optionally, enable the "Continue with purchase" button
      const continueBtn = document.getElementById('continueBtn');
      continueBtn.disabled = false;
  });
});
////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////to disable detail page button 
document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm");
  const fullNameInput = document.getElementById("fullName");
  const countryCodeSelect = document.getElementById("countryCode");
  const mobileNumberInput = document.getElementById("mobileNumber");
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const genderSelect = document.getElementById("gender");
  const continueBtn = document.getElementById("continueBtn");

  // Validate email format
  function isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
  }

  // Validate mobile number format
  function isValidMobileNumber(number) {
      const mobileNumberPattern = /^\d{10}$/;
      return mobileNumberPattern.test(number);
  }

  // Update the button state based on form validity
  function updateButtonState() {
      const isValidFullName = fullNameInput.value.trim() !== "";
      const isValidCountryCode = countryCodeSelect.value !== "";
      const isValidMobile = isValidMobileNumber(mobileNumberInput.value);
      const isValidEmailFormat = isValidEmail(emailInput.value);
      const isEmailConfirmed = emailInput.value === confirmEmailInput.value;

      continueBtn.disabled =
          !isValidFullName ||
          !isValidCountryCode ||
          !isValidMobile ||
          !isValidEmailFormat ||
          !isEmailConfirmed;
  }

  // Add event listeners for form fields
  fullNameInput.addEventListener("input", updateButtonState);
  countryCodeSelect.addEventListener("change", updateButtonState);
  mobileNumberInput.addEventListener("input", updateButtonState);
  emailInput.addEventListener("input", updateButtonState);
  confirmEmailInput.addEventListener("input", updateButtonState);

  // Form submission
  userForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Store data in local storage
      const userData = {
          fullName: fullNameInput.value,
          countryCode: countryCodeSelect.value,
          mobileNumber: mobileNumberInput.value,
          email: emailInput.value,
          gender: genderSelect.value,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to payment.html
      window.location.href = "payment.html";
  });
});
////////////////////////////////////////payment/////////////////

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the stored user details and order summary from local storage
  const savedUserDetails = localStorage.getItem('userData');
  const savedSummary = localStorage.getItem('summarytbl');

  // Parse the retrieved JSON data
  const userDetails = JSON.parse(savedUserDetails);

  // Create a table element to display the combined summary
  const table = document.createElement("table");
  table.classList.add("combinedSummaryTable"); // Add a CSS class for styling if needed
  table.style.borderCollapse = "collapse"; // Style for table border collapse

  // Create rows and cells for user details
  const userDetailKeys = Object.keys(userDetails);
  userDetailKeys.forEach(function (key) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = key;
    cell1.style.fontWeight = "bold"; // Style for header cell
    cell1.style.padding = "6px";
    cell2.textContent = userDetails[key];
    cell2.style.padding = "6px";
    // Add additional styles as needed for user detail cells
  });

  // Create a row for the order summary
  const row = table.insertRow();
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  cell1.textContent = "Order Summary";
  cell1.style.fontWeight = "bold"; // Style for header cell
  cell1.style.padding = "6px";
  cell2.innerHTML = savedSummary;
  cell2.style.padding = "6px";
  // Add additional styles as needed for order summary cells

  // Append the table to the desired container on the payment.html page
  const summaryContainer = document.getElementById("summaryContainer"); // Make sure to add an element with the id "summaryContainer" on your payment.html
  if (summaryContainer) {
    summaryContainer.appendChild(table);
  } else {
    console.log("Error: summaryContainer not found.");
  }
});


            
          

////////////////////////////////////////////////////////////////confirmation page///////////////

  
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve user details from local storage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // Display the summary of the order
  if (userDetails) {
    const confirmationContainer = document.querySelector(".confirmation-container");

    // Create elements to display the summary
    const summaryHeading = document.createElement("h3");
    summaryHeading.textContent = "Order Summary";

    const summaryList = document.createElement("ul");
    for (const [key, value] of Object.entries(userDetails)) {
      const listItem = document.createElement("li");
      listItem.textContent = `${key}: ${value}`;
      summaryList.appendChild(listItem);
    }

    // Append summary elements to the confirmation container
    confirmationContainer.appendChild(summaryHeading);
    confirmationContainer.appendChild(summaryList);
  }
});




// Function to handle the button click event
function redirectToHikkaduwaPage() {
  // Redirect to the booking page
  window.location.href = "hikkaduwa.html";
}

// Add a click event listener to the "Book Now" button
document.getElementById("backBtn").addEventListener("click", redirectToHikkaduwaPage);



///////////////////////////////////design for the confirmation table///////////////
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the summary from local storage and display it
  const savedSummary = localStorage.getItem('summarytbl');
  if (savedSummary) {
      document.getElementById("summarycont").innerHTML = savedSummary;
  }
});
  

const summaryContainer = document.getElementById("summaryContainer");

// Apply CSS styles to the summaryContainer element
if (summaryContainer) {
  summaryContainer.style.position = "absolute";
  summaryContainer.style.top = "350px";
  summaryContainer.style.backgroundColor = "#f9f9f9";
  summaryContainer.style.borderRadius = "10px";
  summaryContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  // You can set other styles as needed
}




