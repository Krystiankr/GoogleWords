const btnPressed = document.getElementById('dodajBtn');
const displayPressed = document.getElementById('displayBtn');
const testPressed = document.getElementById('testBtn');
const usunPressed = document.getElementById('usunBtn');
const storagePressed = document.getElementById('storageBtn');
const textIndex = [];
var storage_items = [];

window.onload = function () {
  console.log('onload' + Date());
  chrome.storage.local.get(['item'], (res) => {
    for (const it in res.item) {
      renderItem(res.item[it]);
      storage_items.push(res.item[it]);
    }
    console.log('windowLoad' + res.item);
  });
};

function refreshStorage() {
  console.log('refresh');
  const x_Buttons = document.getElementsByClassName('x_btn');
  storage_items = [];
  for (const box of x_Buttons) {
    console.log(box.innerHTML)
  
    const ang = box.parentNode.parentNode.innerHTML.match('(<th>(.*?)</th>)')[2];
    const pol = box.parentNode.parentNode.innerHTML.match('(\<th>(.*?)\<\/th>)+')[2];
    storage_items.push(ang + ":" + pol);
  }
  chrome.storage.local.set({
    item: storage_items,
  });
}

function SomeDeleteRowFunction() {
  const x_Buttons = document.getElementsByClassName('x_btn');
  for (const box of x_Buttons) {
    box.addEventListener('click', function handleClick(event) {
      console.log('box delete clicked', event);
      var td = event.target.parentNode;
      var tr = td.parentNode; // the row to be removed
      console.log(td.parentNode.innerHTML + 'inner');
      tr.parentNode.removeChild(tr);

      refreshStorage();
    });
  }
}

function renderItem(res) {
  const eng_word = res.split(':')[0];
  const pol_word = res.split(':')[1];
  const itemTable = document.getElementById('table_words');

  const tr_item = document.createElement('tr');
  const th_item1 = document.createElement('th');
  const th_item2 = document.createElement('th');

  const th_btn = document.createElement('button');
  const proba_item = document.createElement('td');

  th_btn.innerHTML = 'X';
  th_btn.setAttribute('class', 'x_btn');
  th_item1.textContent = `${eng_word}`;
  th_item2.textContent = `${pol_word}`;

  th_btn.innerHTML = 'X';

  tr_item.appendChild(th_item1);
  tr_item.appendChild(th_item2);

  proba_item.appendChild(th_btn);
  tr_item.appendChild(proba_item);

  itemTable.appendChild(tr_item);

  document.body.appendChild(itemTable);
  const xBtn = document.getElementById('x_btn');
  SomeDeleteRowFunction();
}


btnPressed.addEventListener('click', () => {
  chrome.runtime.sendMessage(null, 'popupjs', (response) => {
    console.log("I'm from the sendfrom popupjs!" + response);
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(`TABS - ${tabs[0].title}, id: ${tabs[0].id}`);
    //chrome.tabs.remove(tabs[0].id, function() {})
    chrome.tabs.sendMessage(tabs[0].id, 'popup', (response) => {
      console.log("I'm response: " + response);
      renderItem(response);
      storage_items.push(response);
      chrome.storage.local.set({
        item: storage_items,
      });
    });
  });
});
