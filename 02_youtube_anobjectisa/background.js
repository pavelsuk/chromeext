console.log("background.js log")

let active_tab_id = 0;

function log2_frontend_console() {
    console.log("background.js log2_frontend_console")
}

chrome.tabs.onActivated.addListener(tab => {
    console.log(tab);
    chrome.tabs.get(tab.tabId, current_tab_info => {

        active_tab_id = tab.tabId;    
        
        if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
            /* doesn't work w/ v3 manifest:
            // chrome.tabs.insertCSS(null, { file: './mystyles.css' });
            // chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
            */
            
            // rewritten to:
            chrome.scripting.insertCSS({
                target: { tabId: active_tab_id },
                files: ['./mystyles.css'] // it can be also: function: log2_frontend_console
              }, () => console.log('CSS is injected')); // this log will appear in service console 

            chrome.scripting.executeScript({
                target: { tabId: active_tab_id },
                files: ['./foreground.js'] // it can be also: function: log2_frontend_console
              }, () => console.log('foreground.js is injected')); // this log will appear in service console 
        }
    
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message);
        
    if (request.message === 'check the storage bro let me know') {
        sendResponse({message : "yeah, I've got it"});
        chrome.storage.local.get("mykey", value => {
            console.log(value)
        });
    }

    if (request.message === 'loan') {
        loan = 0;
        chrome.storage.local.get("loan", value => {
            console.log(value);
            console.log(value.loan);
            loan = Number(value.loan) * 1.2;
            console.log(loan);
            chrome.storage.local.set({ "loan": loan });
            chrome.tabs.sendMessage(active_tab_id, {message: 'loan returned with interest'});
        });
    }
});