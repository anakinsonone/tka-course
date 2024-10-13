const display = document.getElementById("display");

const appendToDisplay = (value) => {
  display.value += value;
};

const calculate = () => {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = error.msg;
  }
};

const clearDisplay = () => {
  display.value = "";
};

const backspace = () => {
  const currentValue = display.value.split("");
  currentValue.pop();
  display.value = currentValue.join("");
};

const handleKeyboardInput = (event) => {
  const key = event.key;

  const requiredKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "=",
    "Escape",
    "c",
    "C",
    "Enter",
    "Backspace",
  ];

  if (requiredKeys.includes(key)) {
    event.preventDefault();

    if ((key >= "0" && key <= "9") || key === ".") {
      appendToDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      appendToDisplay(key);
    } else if (key === "Enter" || key === "=") {
      calculate();
    } else if (key === "Backspace") {
      backspace();
    } else if (key === "c" || key === "C" || key === "Escape") {
      clearDisplay();
    }
  }
};

window.addEventListener("keydown", handleKeyboardInput);
