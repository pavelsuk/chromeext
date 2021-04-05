console.log("background.js log")

let active_tab_id = 0;

function log2_frontend_console() {
    console.log("background.js log2_frontend_console")
}

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        
        active_tab_id = tab.tabId;    
        
        if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
            /* doesn't work w/ v3 manifest:
            // chrome.tabs.insertCSS(null, { file: './mystyles.css' });
            // chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
            */
           // rewritten to:
            chrome.scripting.executeScript({
                target: { tabId: active_tab_id },
                files: ['./foreground.js'] // it can be also: function: log2_frontend_console
              }, () => console.log('is injected')); // this log will appear in service console 
        }
    
    });
});
