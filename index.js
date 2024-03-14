"use strict";

function validation(form) {
  let result = true;

  form.querySelectorAll("input").forEach((input) => {
    deleteError(input);

    if (input.dataset.phone) {
      const regex = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
      deleteError(input);
      if (!input.value.match(regex)) {
        createError(input, "The phone number must start with +380");
        result = false;
      }
    }

    if (input.dataset.mail) {
      const regex =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      deleteError(input);
      if (!input.value.match(regex)) {
        createError(input, "Email is invalid");
        result = false;
      }
    }

    if (input.dataset.password) {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      deleteError(input);
      if (!input.value.match(regex)) {
        createError(
          input,
          "Password must contain at least 8 symbols, one digit and one special character"
        );
        result = false;
      }
    }

    if (input.dataset.required === "true") {
      if (input.value === "") {
        deleteError(input);
        createError(input, "This field is required");
        result = false;
      }
    }
  });
  return result;
}

function deleteError(input) {
  const parent = input.parentNode;

  if (parent.classList.contains("error")) {
    parent.querySelector(".error-message").remove();
    parent.classList.remove("error");
  }
}

function createError(input, text) {
  const parent = input.parentNode;
  const errorLabel = document.createElement("label");
  errorLabel.classList.add("error-message");
  errorLabel.textContent = text;
  parent.classList.add("error");
  parent.append(errorLabel);
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (validation(this)) {
    alert("Form verified successfully!");
  }
});
