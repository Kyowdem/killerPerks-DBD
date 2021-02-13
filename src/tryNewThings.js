import {CollectionView, Composite, contentView, TextView, TextInput} from 'tabris';

const items = [
  {title: 'Up for lunch?', sender: 'John Smith'},
  {title: 'JavaScript for mobile applications', sender: 'JavaScript Newsletter'},
  {title: 'This is just a spam message', sender: 'Spammer'},
  {title: 'CoolGrocery Discount Newsletter', sender: 'Local CoolGrocery'},
  {title: 'Cinema this weekend?', sender: 'Robert J. Schmidt'},
  {title: 'Coffee Club Newsletter', sender: 'Coffee Club'},
  {title: 'Fraud mail', sender: 'Unsuspicious Jack'}
];

contentView.append(
  new TextInput({
    left: 10, right: 10,
    message: 'Name'
  }).onAccept(({text}) => console.log(text)),
  <CollectionView
      top='prev()'
      stretch
      itemCount={items.length}
      cellHeight={64}
      createCell={createCell}
      updateCell={updateCell}/>
);

function createCell() {
  return (
    <Composite background='gray'>
      <Composite id='container' stretch background='white' onPanHorizontal={handlePan}>
        <TextView id='senderText' left={16} top={8} font='medium 16px'/>
        <TextView id='titleText' left={16} bottom={8}/>
      </Composite>
      <Composite stretchX height={1} background='#eeeeee'/>
    </Composite>
  );
}

function updateCell(view, index) {
  const item = items[index];
  const container = view.find('#container').only();
  container.item = item;
  container.transform = {translationX: 0};
  view.find(TextView).only('#senderText').text = item.sender;
  view.find(TextView).only('#titleText').text = item.title;
}

async function handlePan(event) {
  const {target, state, translationX} = event;
  target.transform = {translationX};
  if (state === 'end') {
    await handlePanFinished(event);
  }
}

async function handlePanFinished({target, velocityX, translationX}) {
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
    transform: {translationX: direction(translationX) * target.bounds.width}
  }, {
    duration: 200,
    easing: 'ease-out'
  });
  const index = items.indexOf(target.item);
  items.splice(index, 1);
  $(CollectionView).only().remove(index);
}

async function animateCancel(target) {
  return target.animate({transform: {translationX: 0}}, {duration: 200, easing: 'ease-out'});
}

function direction(offset) {
  return offset ? offset < 0 ? -1 : 1 : 0;
}
