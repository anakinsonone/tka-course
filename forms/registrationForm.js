let users = JSON.parse(localStorage.getItem("users")) || [];

window.onload = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("dateofbirth").max = today;
};

const validate = (field) => {
  const errorElement = document.getElementById(`${field.name}-error`);
  let errorMessage = "";

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const mobilePattern = /^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/g;

  switch (field.name) {
    case "username":
      if (field.value.length < 5) {
        errorMessage = "Username must be at least 5 characters long.";
      }
      break;
    case "email":
      if (!emailPattern.test(field.value)) {
        errorMessage = "Please enter a valid email address.";
      }
      break;
    case "password":
      if (!passwordPattern.test(field.value)) {
        errorMessage =
          "Password must be at least 8 characters long, contain an upper case, capital case and a special character.";
      }
      break;
    case "re_password":
      const password = document.getElementById("password").value;
      if (password !== field.value) {
        errorMessage = "Passwords do not match.";
      } else if (password === "") {
        errorMessage = "Password cannot be empty.";
      }
      break;
    case "mobile":
      if (!mobilePattern.test(field.value)) {
        errorMessage = "Please enter a valid mobile number.";
      }
      break;
    case "gender":
      const genders = document.querySelectorAll("input[name='gender']");
      let isSelected = false;
      genders.forEach((gender) => {
        if (gender.checked) {
          isSelected = true;
        }
      });
      if (!isSelected) {
        errorMessage = "Please select a gender.";
      }
      break;
    case "dateofbirth":
      if (field.value === "") {
        errorMessage = "Please select your date of birth.";
      }
      break;
    case "city":
      if (field.value === "") {
        errorMessage = "Please select a city.";
      }
      break;
    default:
      break;
  }

  errorElement.innerHTML = errorMessage;

  field.classList.remove("valid-input", "invalid-input");

  if (errorMessage !== "") {
    field.classList.add("invalid-input");
  } else {
    field.classList.add("valid-input");
  }
};

const saveUser = (event) => {
  // event.preventDefault();

  // Get form data
  const username = document.querySelector("input[name='username']").value;
  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='password']").value;
  const mobile = document.querySelector("input[name='mobile']").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const dateofbirth = document.querySelector("input[name='dateofbirth']").value;
  const city = document.querySelector("select[name='city']").value;

  const user = {
    username,
    email,
    password,
    mobile,
    gender,
    dateofbirth,
    city,
  };

  users = [...users, user];
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};
