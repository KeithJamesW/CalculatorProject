window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}


function setupIntialValues() {
  const inputs = {amount: 50000, years: 12, rate: 3};
  const amountInput = document.getElementById("loan-amount");
  amountInput.value = inputs.amount;
  const yearsInput = document.getElementById("loan-years");
  yearsInput.value = inputs.years;
  const rateInput = document.getElementById("loan-rate");
  rateInput.value = inputs.rate;
  update();
}


function update() {
  const currentUIValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}


function calculateMonthlyPayment(inputs) {
  const monthlyRate = (inputs.rate / 100) / 12;
  const n = Math.floor(inputs.years * 12);
  return (
    (monthlyRate * inputs.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2);
}

function updateMonthly(monthly) {
  const monthlyUI = document.getElementById("monthly-payment");
  monthlyUI.innerText = "$" + monthly;
}