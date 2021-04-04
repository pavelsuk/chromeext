let color = '#c96613';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default color set to %corange', `color: ${color}`);
});

