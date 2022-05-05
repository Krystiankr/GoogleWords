chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  const ang_word = document.getElementsByClassName('er8xn')[0].value
  const pol_word = document.getElementsByClassName('Q4iAWc')[0].textContent
  console.log(ang_word)
  sendResponse(ang_word + ":" + pol_word);
});
/*
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse('recieved message from content');
  });*/