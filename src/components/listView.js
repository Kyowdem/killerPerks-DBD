var killerPerksJSON = { "chilli barbecue": 0, "ruine": 0, "chilli et ruine": 0, "bar": 0, "une competence": 0, "baz": 0 };

// Return an array of autocomplete of input user 
const autoCompletion = function () {
  if (inputPerk.text == "") return [];
  var autoPerk = [];

  for (let prop in killerPerksJSON) {
    if (prop.substring(0, inputPerk.text.length) == inputPerk.text)
      if (autoPerk.length <= 5)
        autoPerk.push(prop);
  }
  return autoPerk;
}

// Print autocompletion
const printAutoCompletion = function () {
  var autoPerk = autoCompletion();
  setListView(autoPerk);
}

// when click to list, set text to the list
const autoCompletionToList = function (el) {
  addPerk(el.item);
  setListView();
}

// show/hide ListView
const visibility = function (visible = 1) {
  $(ListView).first().bottom = (visible ? '50' : '100%');
}

// set list with an array and refresh it
const setListView = function (list = []) {
  if (list.length) visibility(1);
  else visibility(0);

  $(ListView).first().items = list;
  $(ListView).first().refresh();
}

// set all to empty
const clearAll = function () {
  inputPerk.text = '';
  setListView();
}

module.exports = { printAutoCompletion, setListView, autoCompletion, autoCompletionToList };