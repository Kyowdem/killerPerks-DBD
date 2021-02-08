import { Button, TextView, contentView, TextInput, AlertDialog } from 'tabris';
import { putJSON } from './JSON.js'


let listNum = 0, killerPerks = [].map(x => x.toLowerCase());


function addPerk(perk) {
    if (!(killerPerks.length < 4)) {
        maxPerks();
        return;
    }

    killerPerks.push(perk.toLowerCase());
    MAJPerk();

    $('TextInput').first().text = '';
    if (killerPerks.length == 4) maxPerks();
}

function deletePerk(perk) {
    const id = perk.target.id - 1;
    killerPerks = killerPerks.filter((item, index) => index != id);

    deleteRow(id);
}

function MAJPerk() {
    deleteAllRow();

    listNum = 0;
    for (let i = 0; i < killerPerks.length; i++) {
        const perk = killerPerks[i];
        addRow(perk);
    }

}

function addRow(perk) {
    new TextView({
        text: `${++listNum}- ${perk}`,
        top: 'prev() 16',
        left: '20%',
        id: killerPerks.length,
    }).appendTo(contentView);

    new Button({
        text: 'x',
        baseline: 'prev()',
        left: 'prev() 100',
        width: 40, height: 40,
        cornerRadius: 28,
        background: 'red',
        id: killerPerks.length,
    }).onSelect(deletePerk).appendTo(contentView);

}

function deleteRow(id) {
    $(`TextView`)[id].dispose();
    MAJPerk();
}

function deleteAllRow() {
    const length = $(`TextView`).length;
    for (let i = 0; i < length; i++)
        $(`TextView`).first().dispose();
}

function maxPerks() {
    new AlertDialog({
        title: 'Les 4 atouts ont ete ajoutes. Voulez-vous les ajouter?',
        buttons: { ok: 'Oui', cancel: 'Non' }
    }).open().onCloseOk(() => {
        putJSON(killerPerks);
        killerPerks = [];
        MAJPerk();
    }).onCloseCancel(() => $('TextInput').first().text = '');
}

module.exports = {
    addPerk, MAJPerk, killerPerks
}
