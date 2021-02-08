import { TextView, contentView, TextInput } from 'tabris';
import { Cell, ListView } from 'tabris-decorators';
import { getJSON } from './components/JSON.js';
import { addPerk, MAJPerk } from './components/perk.js';
import { autoCompletion, setListView, printAutoCompletion, autoCompletionToList } from './components/listView.js';


const defaultApp = function () {
  MAJPerk();
  visibility(0);
  // killerPerksJSON = getJSON();
}

const inputPerk = new TextInput({
  top: 24,
  left: '15%',
  right: '15%',
  message: "Entrer le nom d'un perk"
}).onAccept(function () { addPerk(this.text) }).onInput(() => (inputPerk.text.length >= 3) ? printAutoCompletion() : setListView());


contentView.append(
  inputPerk,
  <ListView background="#FFD400" left="60" top="90" right="60" bottom="50"
    stretch onSelect={autoCompletionToList} items={autoCompletion()}>
    <Cell selectable padding={6} height={25}>
      <TextView centerY bind-text='item' font='12px' />
    </Cell>
  </ListView>
);

defaultApp();