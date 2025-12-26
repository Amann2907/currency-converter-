// Your API key
const API_KEY = "c2c5012d2a1cf4f54b95f6b5";

// Default URL
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdown
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") newOption.selected = true;
    if (select.name === "to" && currCode === "INR") newOption.selected = true;

    select.append(newOption);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

// Update flag
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  element.parentElement.querySelector("img").src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Fetch and update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal < 1 || amtVal === "") {
    amtVal = 1;
    amount.value = "1";
  }

  // Correct API URL
  const URL = `${BASE_URL}${fromCurr.value}`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data.conversion_rates[toCurr.value];
  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Auto-run on load
window.addEventListener("load", updateExchangeRate);