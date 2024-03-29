console.log("foreground.js log")
// document.querySelector('.lnXdpd').classList.add('spinspinspin')

if (!document.getElementById("first")) {
    injectButtons();
} else {
    updateButtons();
}

function readLoan(callback) {
    loan = 0;
    chrome.storage.local.get("loan", value => {
        console.log(value);
        console.log(value.loan);
        loan = value.loan.toFixed();
        callback(loan)
    });
}

function injectButtons() {

 
    console.log("injectButtons")

    const first = document.createElement('button');
    first.innerText = "SET DATA";
    first.id = "first";
    
    const second = document.createElement('button');
    second.innerText = "SHOUTOUT AND WAIT";
    second.id = "second";
    
    const third = document.createElement('button');
    third.innerText = "Calculate interest";
    third.id = "third";
    
    const loandiv = document.createElement('div');
    const loanval = document.createElement('div');
    readLoan( loandata => {
        loanval.innerText = loandata;
    });
    loanval.id = "loanval"


    loandiv.id = "loandiv";
    loandiv.insertBefore(third, loandiv.childNodes[0]);
    loandiv.appendChild(loanval)
    
    
    document.querySelector('body').appendChild(first);
    document.querySelector('body').appendChild(second);
    // document.querySelector('body').appendChild(third);
    document.querySelector('body').appendChild(loandiv);
    
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
        if (request.message === 'loan returned with interest') {
            readLoan( loandata => {
                document.getElementById("loanval").innerText = loandata;
            });
    
        }
    });
    
}

function updateButtons() {
    if (document.getElementById("loanval")) {
        readLoan( loandata => {
            document.getElementById("loanval").innerText = loandata;
        });    
    }
}

