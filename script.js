const currencyOnePick = document.getElementById('currency-one');
const currencyOneInput = document.getElementById('amount-one');
const currencyTwoPick = document.getElementById('currency-two');
const currencyTwoInput = document.getElementById('amount-two');

const rateDisplay = document.getElementById('rate');
const swapBtn = document.querySelector('.swap-btn');


function calculate() {
  const currencyOne = currencyOnePick.value;
  const currencyTwo = currencyTwoPick.value;

  fetch(`https://v6.exchangerate-api.com/v6/bbf14f09480714c5685f93e9/latest/${currencyOne}`)
    .then(resp => resp.json())
    .then(data => {
      const rate = data.conversion_rates[currencyTwo];

      rateDisplay.textContent = `1 ${currencyOne} = ${rate} ${currencyTwo}`
      currencyTwoInput.value = (currencyOneInput.value * rate).toFixed(2)
    });
}

currencyOnePick.addEventListener('change', calculate);
currencyOneInput.addEventListener('input', calculate);
currencyTwoPick.addEventListener('change', calculate);
currencyTwoInput.addEventListener('input', calculate);

function swapCurrency() {
  const temp = currencyOnePick.value;
  currencyOnePick.value = currencyTwoPick.value;
  currencyTwoPick.value = temp;
  calculate()
}

swapBtn.addEventListener('click', swapCurrency)

calculate()