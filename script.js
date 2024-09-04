
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr  = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){

    for(currCode in countryList){
        let newSelect = document.createElement("option");
        newSelect.innerText = currCode;
        newSelect.value = currCode;
        if (select.name === 'from' && currCode === 'USD'){
            newSelect.selected = 'selected';
        } else if (select.name === 'to' && currCode === 'PKR'){
            newSelect.selected = 'selected';
        }
        select.append(newSelect);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flag;
};

window.addEventListener("load", () => {
    updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
}); 

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let from_country = fromCurr.value.toLowerCase();
    let to_country = toCurr.value.toLowerCase();
    let rate = data[from_country][to_country];
    let final_amount = rate*amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${final_amount} ${toCurr.value}`;
}