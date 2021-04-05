console.log("foreground.js log")
document.querySelector('.lnXdpd').classList.add('spinspinspin')

const first = document.createElement('button');
first.innerText = "SET DATA";
first.id = "first";

const second = document.createElement('button');
second.innerText = "SHOUTOUT AND WAIT";
second.id = "second";

const third = document.createElement('button');
third.innerText = "Calculate interest";
third.id = "third";

document.querySelector('body').appendChild(first);
document.querySelector('body').appendChild(second);
document.querySelector('body').appendChild(third);

first.addEventListener('click', () => {
    chrome.storage.local.set({ "mykey": "mydata123" });
    chrome.storage.local.set({ "loan": "100" });
    console.log("I SET DATA");
});

second.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'check the storage bro let me know'}, res => console.log(res));
    console.log('I SENT THE MESSAGE')
});

third.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'loan'});
    console.log('LOAN')
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message);
});

