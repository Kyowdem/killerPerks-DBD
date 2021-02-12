import { TextView, contentView, TextInput, CollectionView } from 'tabris';
import { Cell, ListView } from 'tabris-decorators';
import { getJSON } from './components/JSON.js';
import { addPerk, MAJPerk } from './components/perk.js';


const perksWritted = ['Apple', 'Banana', 'Cherry'];
const collectionPerk = new CollectionView({
  left: "20%", top: "prev() 16", right: 0, bottom: 0,
  itemCount: perksWritted.length,
  createCell: () => new TextView(),
  updateCell: (view, index) =>  {
    view.text = perksWritted[index];
  }
});

const inputPerk = new TextInput({
  top: 24,
  left: '15%',
  right: '15%',
  message: "Entrer le nom d'un perk"
}).onAccept(function () { addPerk(this.text) }).onInput(() => (inputPerk.text.length >= 3) ? printAutoCompletion() : setListView());


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

const defaultApp = function () {
  MAJPerk();
  visibility(0);
  // killerPerksJSON = getJSON();
  // collectionPerk.insert("test");
}


contentView.append(
  inputPerk,
  <ListView background="#FFD400" left="60" top="90" right="60" bottom="50"
    stretch onSelect={autoCompletionToList} items={autoCompletion()}>
    <Cell selectable padding={6} height={25}>
      <TextView centerY bind-text='item' font='12px' />
    </Cell>
  </ListView>,
  collectionPerk
);

defaultApp();