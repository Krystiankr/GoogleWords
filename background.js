const items = [];
chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    item: [],
  });
  chrome.contextMenus.create({
    title: 'Cambridge Dicrionary',
    id: 'exten',
    contexts: ['selection'],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    chrome.tabs.create({
      url: `https://dictionary.cambridge.org/pl/dictionary/english/${event.selectionText}`,
    });
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse('recieved message from background');
});
