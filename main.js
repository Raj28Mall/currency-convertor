const dropDown_1 = document.querySelector("#currencyDrop_1");
const dropDown_2 = document.querySelector("#currencyDrop_2");

async function populateDropdown() {
    try {
        const x = await fetch('currency_names.json');
        if (!x.ok) {
            throw new Error("Error fetching the JSON File");
        }
        const y = await x.json();



        const z = Object.entries(y);
        z.sort((a, b) => {
            const currencyA = a[1].toLowerCase();
            const currencyB = b[1].toLowerCase();

            if (currencyA > currencyB) {
                return 1;
            }
            else if (currencyA < currencyB) {
                return -1;
            }
            else {
                return 0;
            }
        });

        const currency_names = Object.fromEntries(z);

        for (const code in currency_names) {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = code;
            option2.value = code;
            option1.innerHTML = currency_names[code];
            option2.innerHTML = currency_names[code];
            dropDown_1.append(option1);
            dropDown_2.append(option2);

        }

        //the only valid defaults xD
        dropDown_1.value = 'INR';
        dropDown_2.value = 'USD';

        const aboutButton = document.getElementById("aboutButton");
        const aboutDropdown = document.getElementById("aboutDropdown");
        aboutButton.addEventListener("click", () => {
            aboutDropdown.classList.toggle("hidden");
        });

    }
    catch (error) {
        console.error(error);
    }
}

async function getData(baseCurrency, outputCurrency, quantity) {
    const apiKey = 'OVy6C3V4mhP7PuZRsGYMvxGKUeCPpk2Ne8YoKFg1'; //I ran through 2 apikeys before this 🫣 (They each had 300 requests too lol)
    const baseUrl = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_';
    const url_base = `${baseUrl + apiKey}&base_currency=${baseCurrency}`;
    const url_output = `${baseUrl + apiKey}&base_currency=${outputCurrency}`;

    const response_base = await fetch(url_base);
    const response_output = await fetch(url_output);

    if (response_base.ok && response_output.ok) {
        const base_data = await response_base.json();
        const output_data = await response_output.json();

        const base_currencyData = base_data.data;
        const output_currencyData = output_data.data;
        const date = base_data.meta.last_updated_at;
        const formattedDate = dayjs(date).format("dddd, MMMM D, YYYY h:mm:ss A [UTC]"); //because previous format wasnt readable
        const lastUpdated = document.querySelector("#date");
        lastUpdated.innerHTML = "Last updated: " + formattedDate;
        const ans = (Math.round(base_currencyData[outputCurrency]['value'] * quantity * 1000) / 1000).toLocaleString('en-US');;

        const outputBar = document.querySelector("#output");
        outputBar.innerHTML = `${ans} ${outputCurrency}`;

        const normalRate = base_currencyData[outputCurrency]['value'];
        let goodCurrencies = {};
        if (!normalRate || normalRate === 0) {
            console.error("Invalid normalRate:", normalRate);
            return;
        }

        for (const input_code in base_currencyData) {
            if (input_code === baseCurrency || input_code === outputCurrency) {
                continue;
            }
            const baseRate = base_currencyData[input_code]['value'];
            const outputRate = output_currencyData[input_code]['value'];
            if (!baseRate || !outputRate || outputRate === 0) {
                continue;
            }
            const currRate = (baseRate / outputRate);
            if (currRate > normalRate) {
                goodCurrencies[input_code] = currRate * quantity;
            }
        }
        const goodCurrencies_array = Object.entries(goodCurrencies);

        goodCurrencies_array.sort((a, b) => {
            const currA = a[1];
            const currB = b[1];
            if (currA > currB) {
                return -1;
            }
            else if (currA < currB) {
                return 1;
            }
            else {
                return 0;
            }
        })

        let firstCurr = `${baseCurrency} -> ${goodCurrencies_array[0][0]} -> ${outputCurrency}: 
        ${goodCurrencies_array[0][1]}`;
        let secondCurr = `${baseCurrency} -> ${goodCurrencies_array[1][0]} -> ${outputCurrency}: 
        ${goodCurrencies_array[1][1]}`;
        let thirdCurr = `${baseCurrency} -> ${goodCurrencies_array[2][0]} -> ${outputCurrency}: 
        ${goodCurrencies_array[2][1]}`;

        localStorage.setItem('firstCurr', firstCurr);
        localStorage.setItem('secondCurr',secondCurr);
        localStorage.setItem('thirdCurr',thirdCurr);
        localStorage.setItem('original', (normalRate*quantity));
    }   
    else {
        alert("An error occurred while fetching API");
    }
}



const btn = document.querySelector("#btn");
const swap = document.querySelector("#swap");
const popup = document.querySelector("#popup");
const popupMessage = document.querySelector("#popupMessage");

function showPopup(message) {
    popupMessage.innerHTML = message;
    popup.classList.remove("hidden");

    setTimeout(() => { popup.classList.add("hidden"); }, 500);
}

btn.addEventListener('click', e => {
    const inputQuantity = parseInt((document.querySelector("#inputQuantity")).value);

    if (inputQuantity <= 0 || isNaN(inputQuantity)) {
        alert("Pls enter valid amount");
        console.error("Pls enter a valid amount");
    }
    else if (inputQuantity >= 1000000000000) {
        alert("Amount is too large");
        console.error("Pls enter a valid amount")
    }
    else {

        // Just for fun lol
        if (inputQuantity >= 10000000000) {
            showPopup("Paisa hi paisa💸💸💸");
        }
        else if ((inputQuantity === 69) || ((inputQuantity / 69) === 101) || ((inputQuantity / 69) === 10101) || ((inputQuantity / 69) === 1010101)) {
            showPopup("Nice! 🔥");
        }
        else if (inputQuantity === 420) {
            showPopup("Chill, bro! 🍃");
        }
        else if (inputQuantity === 404) {
            showPopup("404. Money Not Found 💀");
        }

        const inputCurrency = document.querySelector("#currencyDrop_1").value;
        const outputCurrency = document.querySelector("#currencyDrop_2").value;
        if (inputCurrency == outputCurrency) {
            alert("Converting to the same currency? 🤔");
        }
        else {
            getData(inputCurrency, outputCurrency, inputQuantity);
        }
    }
});

swap.addEventListener('click', e => {
    const temp = dropDown_1.value;
    dropDown_1.value = dropDown_2.value;
    dropDown_2.value = temp;
});

window.onload = () =>{
    localStorage.clear();
    populateDropdown();
}
