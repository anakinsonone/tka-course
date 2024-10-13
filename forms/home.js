window.onload = () => {
  const user = localStorage.getItem("currentUser");
  const welcomeH1 = document.getElementById("welcome-message");

  if (user) {
    welcomeH1.innerHTML = `Welcome, ${user}!`;
  } else {
    window.location.href = "loginForm.html";
  }
};

const logout = () => {
  localStorage.setItem("currentUser", "");
  window.location.href = "loginForm.html";
};
