const URLJSON = "https://json.extendsclass.com/bin/64c447c371b3";
// export var killerPerksJSON = getJSON();
export var killerPerksJSON = [{ "name": "chilli barbecue", "value": 19 }, { "name": "sort: ruine", "value": 12 }, { "name": "le tour est joué", "value": 11 }, { "name": "vocation de l'infirmière", "value": 11 }, { "name": "intervention malefique", "value": 10 }, { "name": "murmures", "value": 9 }, { "name": "boucher sadique", "value": 8 }, { "name": "thanatophobie", "value": 8 }, { "name": "sort: mangeur d'espoir", "value": 6 }, { "name": "espion de l'ombre", "value": 5 }, { "name": "discorde", "value": 5 }, { "name": "murmure amer", "value": 4 }, { "name": "force brute", "value": 3 }, { "name": "gardons le meilleur pour la fin", "value": 3 }, { "name": "surveillance et maltraitance", "value": 3 }, { "name": "sort: immortel", "value": 3 }, { "name": "stridor", "value": 2 }, { "name": "frissons palpitants", "value": 2 }, { "name": "sort: le troisieme sceau", "value": 2 }, { "name": "je vous ecoute", "value": 2 }, { "name": "surcharge", "value": 2 }, { "name": "chien de sang", "value": 2 }, { "name": "sort: berceuse de la chasseuse", "value": 2 }, { "name": "cran dement", "value": 2 }, { "name": "poigne de fer", "value": 2 }, { "name": "bricolo", "value": 2 }, { "name": "sort: chatiment", "value": 2 }, { "name": "reparateur", "value": 2 }, { "name": "tenace", "value": 2 }, { "name": "deboussoler", "value": 2 }, { "name": "vierge de fer", "value": 1 }, { "name": "sombre devotion", "value": 1 }, { "name": "ecureuil", "value": 1 }, { "name": "pisteur", "value": 1 }, { "name": "sort: personne n'echappe a la mort", "value": 1 }, { "name": "inquietant", "value": 1 }, { "name": "surveillance", "value": 1 }, { "name": "prise de decision", "value": 1 }, { "name": "coup de grace", "value": 1 }, { "name": "chute de franklin", "value": 1 }, { "name": "peur contagieuse", "value": 1 }, { "name": "resistance a l'obscurite", "value": 1 }]

export function putJSON(killerPerks) {
    for (let i = 0; i < killerPerks.length; i++) {
        const perk = killerPerks[i];

        var index = killerPerksJSON.findIndex(el => el.name == perk);
        if (index != -1)
            ++killerPerksJSON[index].value;
        else
            killerPerksJSON.push({"name": "${perk}", "value": 1})

    }

    killerPerksJSON = killerPerksJSON.sort((a, b) => a.value - b.value).reverse();
    console.log({ killerPerksJSON });
    // sendJSON();
}

function getJSON() {
    const request = new XMLHttpRequest();
    request.open("GET", URLJSON, true);
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            const response = JSON.parse(request.responseText);
            console.log({ response });
            killerPerksJSON = response;
        }
    };
    request.send();
}

const sendJSON = function () {
    const request = new XMLHttpRequest();
    request.open("PUT", URLJSON, true);
    request.send(JSON.stringify(killerPerksJSON));

    console.log('Les donnees ont été envoyé');
}
