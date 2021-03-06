import { CollectionView, Composite, contentView, TextView, TextInput, AlertDialog, NavigationView, Page } from 'tabris';
import { Cell, ListView } from 'tabris-decorators';
import { killerPerksJSON, putJSON } from './components/JSON'


// Added perk after confirm typing
var addedPerks = [];
// Purpose perks on typing
var purposePerk = [];

contentView.append(
  <TextInput left={10} right={10} message="Perk" onInput={({ text }) => printAutoCompletion(text)} onAccept={({ text }) => addNewItem(text)}></TextInput>,
  <ListView background="#fff" top="prev() 10" padding={5} bottom="50" left="5" right="5"
    stretch onSelect={({ item }) => addNewItem(item)} items={purposePerk}>
    <Cell selectable padding={6} height={35}>
      <TextView centerY bind-text='item' font='16px' />
    </Cell>
  </ListView>,
  <CollectionView
    top='prev()'
    stretch
    itemCount={addedPerks.length}
    cellHeight={50}
    createCell={createCell}
    updateCell={updateCell} />
);

main();

function main() {
  visibility(0);
}

function popup(text) {
  new AlertDialog({
    title: text,
    buttons: { ok: "Ok" }
  }).open();
}

function createCell() {
  return (
    <Composite background='gray'>
      <Composite id='container' stretch background='white' onPanHorizontal={handlePan}>
        <TextView id='text' left={16} top='35%' font='medium 16px' />
      </Composite>
      <Composite stretchX height={1} background='#eeeeee' />
    </Composite>
  );
}

function updateCell(view, index) {
  const item = addedPerks[index];
  const container = view.find('#container').only();
  container.item = item;
  container.transform = { translationX: 0 };
  view.find(TextView).only('#text').text = item;
}

async function handlePan(event) {
  const { target, state, translationX } = event;
  target.transform = { translationX };
  if (state === 'end') {
    await handlePanFinished(event);
  }
}

async function handlePanFinished({ target, velocityX, translationX }) {
  const beyondCenter = Math.abs(translationX) > target.bounds.width / 2;
  const fling = Math.abs(velocityX) > 200;
  const sameDirection = direction(velocityX) === direction(translationX);
  // When swiped beyond the center, trigger dismiss if flinged in the same direction or let go.
  // Otherwise, detect a dismiss only if flinged in the same direction.
  const dismiss = beyondCenter ? (sameDirection || !fling) : (sameDirection && fling);
  if (dismiss) {
    await animateDismiss(target, translationX);
  } else {
    await animateCancel(target);
  }
}

async function animateDismiss(target, translationX) {
  await target.animate({
    transform: { translationX: direction(translationX) * target.bounds.width }
  }, {
    duration: 200,
    easing: 'ease-out'
  });
  const index = addedPerks.indexOf(target.item);
  addedPerks.splice(index, 1);
  $(CollectionView).last().remove(index);
}

async function animateCancel(target) {
  return target.animate({ transform: { translationX: 0 } }, { duration: 200, easing: 'ease-out' });
}

function direction(offset) {
  return offset ? offset < 0 ? -1 : 1 : 0;
}


// Print autocompletion
function printAutoCompletion(perk) {
  if (perk.length >= 3)
    setListView(autoCompletion(perk));
  else
    setListView();
}

function addNewItem(perk) {
  if (addedPerks.some(x => x == perk)) {
    popup(`The perk "${perk}" has already been added`);
  }
  else if (addedPerks.length < 4) {
    addedPerks.push(perk.toLowerCase());
    $("CollectionView").first().refresh();
    $("CollectionView").first().insert(0);
  }
  // Print message after 4 perk added
  if (addedPerks.length > 3) {
    sendPerkToJSON();
  }


  // Stop focused input
  $('TextInput').first().focused = false;
  $('TextInput').first().text = "";
  visibility(0);
}

function sendPerkToJSON() {
  new AlertDialog({
    title: "Les 4 perk seront ajoutés",
    buttons: { ok: "Ok", cancel: "Cancel" }
  }).open().onCloseOk(() => {
    putJSON(addedPerks);
    for (let i = 0; i < 4; i++) $(CollectionView).last().remove(0);
    // Empty after added it to cloud
    addedPerks = [];
  });

}

// Return an array of autocomplete of input user 
function autoCompletion(perk) {
  if (perk == "") return [];
  var autoPerk = [];

  for (let i = 0; i < killerPerksJSON.length; i++) {
    var prop = killerPerksJSON[i].name
    if (prop.includes(perk))
      // Limit to 5 element
      if (autoPerk.length < 5)
        autoPerk.push(prop);
  }
  return autoPerk;
}


// set list with an array and refresh it
function setListView(list = []) {
  if (list.length) visibility(1);
  else visibility(0);

  $(ListView).first().items = list;
  $(ListView).first().refresh();
}

// show/hide ListView
function visibility(visible = 1) {
  $(ListView).first().bottom = (visible ? '50' : '100%');
}
