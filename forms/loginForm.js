const validate = (field) => {
  const errorElement = document.getElementById(`${field.name}-error`);
  let errorMessage = "";

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  switch (field.name) {
    case "username":
      if (field.value.length < 5) {
        errorMessage = "Username must be at least 5 characters long.";
      }
      break;
    case "password":
      if (!passwordPattern.test(field.value)) {
        errorMessage =
          "Password must be at least 8 characters long, contain an upper case, capital case and a special character.";
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

const validateUser = (event) => {
  event.preventDefault();

  const username = document.querySelector("input[name='username']").value;
  const password = document.querySelector("input[name='password']").value;

  const allUsers = JSON.parse(localStorage.getItem("users"));

  const userExists = allUsers.find(
    (user) => user.username === username && user.password === password,
  );

  if (userExists) {
    localStorage.setItem("currentUser", username);
    window.location.href = "home.html";
  } else {
    alert("User is not registered.");
  }
};
