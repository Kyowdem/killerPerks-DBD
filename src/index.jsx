import { CollectionView, Composite, contentView, TextView, TextInput } from 'tabris';

var items = [
  'chilli barbecue',
  'sort: ruine',
  'sort: immortel',
];

contentView.append(
  new TextInput({
    left: 10, right: 10,
    message: 'Name'
  }).onAccept(({ text }) => addNewItem(text)),
  <CollectionView
    top='prev()'
    stretch
    itemCount={items.length}
    cellHeight={50}
    createCell={createCell}
    updateCell={updateCell} />
);

function addNewItem(perk) {
  items.push(perk);

  $("CollectionView").first().refresh();
  $("CollectionView").first().insert(0);

  // Stop focused input
  $('TextInput').first().focused = false;
  $('TextInput').first().text = "";
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
  const item = items[index];
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
  const index = items.indexOf(target.item);
  items.splice(index, 1);
  $(CollectionView).only().remove(index);
  console.log(items);
}

async function animateCancel(target) {
  return target.animate({ transform: { translationX: 0 } }, { duration: 200, easing: 'ease-out' });
}

function direction(offset) {
  return offset ? offset < 0 ? -1 : 1 : 0;
}
