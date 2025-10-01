const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const upperCaseCheckbox = document.getElementById("uppercase");
const lowerCaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{};:,.<>?";
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});
generateButton.addEventListener("click", makePassword);
function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUpperCase = upperCaseCheckbox.checked;
  const includeLowerCase = lowerCaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;
  if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
    alert("Please Select At Least One Character Type!");
    return;
  }
  const newPassword = createRandomPassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}
function createRandomPassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) {
  let allCharacters= "";
  if (includeUpperCase) allCharacters += upperCaseLetters;
  if (includeLowerCase) allCharacters += lowerCaseLetters;
  if (includeNumbers) allCharacters += numbers;
  if (includeSymbols) allCharacters += symbolCharacters;
  let password = "";
  for (let i=0; i<length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }
  return password;
}
function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()\-_=+\[\]{};:,.<>?]/.test(password);
  let strengthScore = 0;
  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUpperCase) strengthScore += 15;
  if (hasLowerCase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 30);
  }
  const finalScore = Math.min(100, strengthScore);
  let strengthLabelText = "";
  let barColor = "";
  let barWidth = "";
  if (strengthScore < 40) {
    barColor = "#fc8181";
    strengthLabelText = "Weak";
    barWidth = "10%";
  }
  else if (strengthScore < 70) {
    barColor = "#fbd38d";
    strengthLabelText = "Medium";
    barWidth = "50%";
  }
  else {
    barColor = "#68d391";
    strengthLabelText = "Strong";
    barWidth = "100%";
  }
  strengthBar.style.width = barWidth;
  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;
}
window.addEventListener("DOMContentLoaded", makePassword);
copyButton.addEventListener("click", () => {
  if(!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value).then(() => showCopySuccess()).catch((error) => console.log("Could Not Copy: ", error));
});
function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#48bb78";
  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.remove("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}
