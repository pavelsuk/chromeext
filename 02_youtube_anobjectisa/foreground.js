console.log("foreground.js log")
// document.querySelector('.lnXdpd').classList.add('spinspinspin')

const first = document.createElement('button');
first.innerText = "SET DATA";
first.id = "first";

const second = document.createElement('button');
second.innerText = "SHOUTOUT TO BACKEND";
second.id = "second";

document.querySelector('body').appendChild(first);
document.querySelector('body').appendChild(second);

first.addEventListener('click', () => {
    chrome.storage.local.set({ "mykey": "mydata123" });
    console.log("I SET DATA");
});


