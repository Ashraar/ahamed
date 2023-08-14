// Function to check if all required fields are valid and filled
function validateFields() {
    const cardNumber = document.getElementById("cardNumber");
    const expiryDate = document.getElementById("expiryDate");
    const cvc = document.getElementById("cvc");
    const nameOnCard = document.getElementById("nameOnCard");

    // Check if all fields are filled and valid
    const allFieldsValid = cardNumber.checkValidity() && expiryDate.checkValidity() && cvc.checkValidity() && nameOnCard.checkValidity();

    // Enable or disable the "Pay" button based on field validation
    const payButton = document.getElementById("payButton");
    payButton.disabled = !allFieldsValid;
  }

  // Function to handle form submission
  function submitForm() {
    // Validate the fields before submitting the form
    const cardNumber = document.getElementById("cardNumber");
    const expiryDate = document.getElementById("expiryDate");
    const cvc = document.getElementById("cvc");
    const nameOnCard = document.getElementById("nameOnCard");

    if (!cardNumber.checkValidity() || !expiryDate.checkValidity() || !cvc.checkValidity() || !nameOnCard.checkValidity()) {
      // If any field is not valid, prevent the form submission
      return;
    }

    // Fields are valid, allow the form submission
    // The form will be automatically redirected to "confirmation.html"
  }

  // Add event listener to the form for submission
  document.getElementById("paymentForm").addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call the function to handle form submission
    submitForm();
  });

  // Add event listeners to each input field to validate on input
  document.getElementById("cardNumber").addEventListener("input", validateFields);
  document.getElementById("expiryDate").addEventListener("input", validateFields);
  document.getElementById("cvc").addEventListener("input", validateFields);
  document.getElementById("nameOnCard").addEventListener("input", validateFields);
