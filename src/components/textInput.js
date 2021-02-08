import { setListView, printAutoCompletion } from './listView.js';
import { addPerk } from './perk.js';


const inputPerk = new TextInput({
    top: 24,
    left: '15%',
    right: '15%',
    message: "Entrer le nom d'un perk"
  })
  .onAccept(function () { addPerk(this.text) })
  .onInput(() => (inputPerk.text.length >= 3) ? printAutoCompletion() : setListView());

module.exports = { inputPerk };