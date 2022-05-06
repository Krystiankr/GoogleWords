window.onload = function () {
chrome.storage.local.get(['item'], (res) => {
  var json_test = '{';
  res.item.forEach((element) => {
    console.log(element + '<<');
    json_test += element + ',';
  });
  json_test = json_test.slice(0, -1);
  json_test += '}';

  const div = document.createElement('div');
  div.innerHTML = json_test;

  const root_div = document.getElementById('json_text');
  root_div.appendChild(div);
})}