
// Print autocompletion
export function printAutoCompletion(perk) {
    if (perk.length >= 3)
        setListView(autoCompletion(perk));
    else
        setListView();
}

export function addNewItem(perk) {
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
        popup('Les 4 perk seront ajoutés');
        putJSON(addedPerks);

        // Empty after added it to cloud
        for (let i = 0; i < 4; i++) $(CollectionView).last().remove(0);
        addedPerks = [];
    }


    // Stop focused input
    $('TextInput').first().focused = false;
    $('TextInput').first().text = "";
    visibility(0);
}

// Return an array of autocomplete of input user 
export function autoCompletion(perk) {
    if (perk == "") return [];
    var autoPerk = [];

    for (let prop in killerPerksJSON) {
        if (prop.substring(0, perk.length) == perk)
            if (autoPerk.length <= 5)
                autoPerk.push(prop);
    }
    return autoPerk;
}


// set list with an array and refresh it
export function setListView(list = []) {
    if (list.length) visibility(1);
    else visibility(0);

    $(ListView).first().items = list;
    $(ListView).first().refresh();
}

// show/hide ListView
export function visibility(visible = 1) {
    $(ListView).first().bottom = (visible ? '50' : '100%');
}
