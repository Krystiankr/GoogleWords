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
    console.log(`Dodaje do local...${event.selectionText}`);
   
    items.push(event.selectionText);
    chrome.storage.local.set({
      item: items,
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(`TABS - ${tabs[0].title}, id: ${tabs[0].id}`);
      //chrome.tabs.remove(tabs[0].id, function() {})
      chrome.tabs.sendMessage(tabs[0].id, "aa", (response) => {console.log("I'm response: " + response)});
    });
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse('recieved message from background');
});
