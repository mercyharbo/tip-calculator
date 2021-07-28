let billAmount = document.getElementById('tipAmount');
let noOfPeople = document.getElementById('numPeople');
let tipAmount = document.getElementById('perPerson');
let totalAmount = document.getElementById('totalPerson');
let billError = document.getElementById('billError');
let peopleError = document.getElementById('peopleError');
let tipButtons = document.querySelectorAll('.tipButton');
let activeButton = document.querySelector('.activeButton');
let customTip = document.querySelector('.custom');
let resetButton = document.querySelector('.reset');

let firstTime = true, billValue, peopleCount, tipButton, customTipValue, tipPerc = 0.05;

const calcTip = () => {
    if (peopleCount == 0 || !peopleCount) {
        if (!firstTime) {
            peopleError.textContent = "Cannot Be Zero";
        }
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00'
        return;
    }

    if (billValue == 0 || !billValue) {
        billError.textContent = "Cannot Be Zero";
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        return;
    }
    billError.textContent = '';
    peopleError.textContent = '';
    const tipPerPerson = (billValue * tipPerc) / peopleCount;
    const totalPerPerson = (billValue / peopleCount) + tipPerPerson;
    tipAmount.textContent = '$' + tipPerPerson.toFixed(2);
    totalAmount.textContent = '$' + totalPerPerson.toFixed(2);

}

const getBillAmount = () => {
    billAmount = document.getElementById('tipAmount');
    if (!billAmount.value || Number(billAmount.value) === 0) {
        billValue = 0;
        calcTip();
        return;
    }
    billValue = Number(billAmount.value)
    calcTip();

}
const getNoOfPeople = () => {
    firstTime = false;
    noOfPeople = document.getElementById('numPeople');
    if (!noOfPeople.value || Number(noOfPeople.value) === 0) {
        peopleCount = 0;
        calcTip();
        return;
    }
    peopleCount = Number(noOfPeople.value)
    calcTip();

}
const getTipPerc = () => {
    switch (activeButton.textContent) {
        case '5%':
            tipPerc = 0.05;
            break;
        case '10%':
            tipPerc = 0.10;
            break;
        case '15%':
            tipPerc = 0.15;
            break;
        case '25%':
            tipPerc = 0.25;
            break;
        case '50%':
            tipPerc = 0.50;
            break;
        default:
            tipPerc = customTipValue / 100;
            break;

    }
}

billAmount.addEventListener('input', getBillAmount);
noOfPeople.addEventListener('input', getNoOfPeople);

tipButtons.forEach((tipButton) => {
    tipButton.addEventListener('click', () => {
        activeButton.classList.remove('activeButton');
        customTip.value = '';
        tipButton.classList.add('activeButton');
        activeButton = tipButton;
        getTipPerc();
        calcTip();

    })
})

customTip.addEventListener('input', () => {
    activeButton.classList.remove('activeButton');
    customTipValue = Number(customTip.value);
    activeButton = customTip;
    getTipPerc();
    calcTip();
})

resetButton.addEventListener('click', () => {
    billAmount.value = '';
    noOfPeople.value = '';
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    billError.textContent = '';
    peopleError.textContent = '';
    activeButton.classList.remove('activeButton');
    const defaultActive = document.querySelector('.default');
    defaultActive.classList.add('activeButton');
    activeButton = defaultActive;
    customTip.value = '';
    billValue = 0, peopleCount = 0, tipButton = 0, customTipValue = 0, tipPerc = 0.05, firstTime = true;
})