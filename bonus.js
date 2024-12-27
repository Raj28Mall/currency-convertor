function process() {
    const firstCurr = localStorage.getItem('firstCurr');
    const secondCurr = localStorage.getItem('secondCurr');
    const thirdCurr = localStorage.getItem('thirdCurr');
    const og = localStorage.getItem('original');

    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    const original = document.getElementById("original");

    if (firstCurr && secondCurr && thirdCurr && og) {
        first.innerHTML = "1. " + firstCurr;
        second.innerHTML = "2. " + secondCurr;
        third.innerHTML = "3. " + thirdCurr;
        original.innerHTML = "Normal conversion: " + og;
        first.style.display = "block";
        second.style.display = "block";
        third.style.display = "block";
        original.style.display = "block";
    } else {
        first.innerHTML = "Please go back and enter some data";
        second.innerHTML = "Please go back and enter some data";
        third.innerHTML = "Please go back and enter some data";
        original.innerHTML = "Please go back and enter some data";
        first.style.display="block";
    }


}

window.onload = () => {
    process();
};
