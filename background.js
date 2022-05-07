const items = [];
chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    item: [],
  });
  chrome.contextMenus.create({
    title: '💼 Cambridge Dicrionary',
    id: 'context_cambridge',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    title: '🪁 Diki Dicrionary',
    id: 'context_diki',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    title: '🌐 Google Translator',
    id: 'context_google',
    contexts: ['selection'],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "context_cambridge"){
      chrome.tabs.create({
        url: `https://dictionary.cambridge.org/pl/dictionary/english/${event.selectionText}`,
      });
    } else if (event.menuItemId === "context_diki"){
      chrome.tabs.create({
        url: `https://www.diki.pl/slownik-angielskiego?q=${event.selectionText}`,
      });
    } else if (event.menuItemId === "context_google"){
      chrome.tabs.create({
        url: `https://translate.google.com/?sl=en&tl=pl&text=${event.selectionText}`,
      });
    } 
    
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse('recieved message from background');
});
