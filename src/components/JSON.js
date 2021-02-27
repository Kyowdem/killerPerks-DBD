const URLJSON = "https://json.extendsclass.com/bin/64c447c371b3";
// export var killerPerksJSON = getJSON();
// export var killerPerksJSON = { "chilli barbecue": 19, "sort: ruine": 12, "sort: immortel": 3, "vocation de l'infirmière": 11, "deboussoler": 2, "le tour est joué": 11, "tenace": 2, "surveillance et maltraitance": 3, "gardons le meilleur pour la fin": 3, "sort: mangeur d'espoir": 6, "reparateur": 2, "discorde": 5, "thanatophobie": 8, "sort: chatiment": 2, "boucher sadique": 8, "espion de l'ombre": 5, "murmures": 9, "bricolo": 2, "murmure amer": 4, "poigne de fer": 2, "cran dement": 2, "resistance a l'obscurite": 1, "sort: berceuse de la chasseuse": 2, "intervention malefique": 10, "peur contagieuse": 1, "chien de sang": 2, "surcharge": 2, "chute de franklin": 1, "coup de grace": 1, "prise de decision": 1, "je vous ecoute": 2, "sort: le troisieme sceau": 2, "force brute": 3, "surveillance": 1, "frissons palpitants": 2, "inquietant": 1, "sort: personne n'echappe a la mort": 1, "stridor": 2, "pisteur": 1, "ecureuil": 1, "sombre devotion": 1, "vierge de fer": 1 };
export var killerPerksJSON = [{ "name": "chilli barbecue", "value": 19 }, { "name": "sort: ruine", "value": 12 }, { "name": "le tour est joué", "value": 11 }, { "name": "vocation de l'infirmière", "value": 11 }, { "name": "intervention malefique", "value": 10 }, { "name": "murmures", "value": 9 }, { "name": "boucher sadique", "value": 8 }, { "name": "thanatophobie", "value": 8 }, { "name": "sort: mangeur d'espoir", "value": 6 }, { "name": "espion de l'ombre", "value": 5 }, { "name": "discorde", "value": 5 }, { "name": "murmure amer", "value": 4 }, { "name": "force brute", "value": 3 }, { "name": "gardons le meilleur pour la fin", "value": 3 }, { "name": "surveillance et maltraitance", "value": 3 }, { "name": "sort: immortel", "value": 3 }, { "name": "stridor", "value": 2 }, { "name": "frissons palpitants", "value": 2 }, { "name": "sort: le troisieme sceau", "value": 2 }, { "name": "je vous ecoute", "value": 2 }, { "name": "surcharge", "value": 2 }, { "name": "chien de sang", "value": 2 }, { "name": "sort: berceuse de la chasseuse", "value": 2 }, { "name": "cran dement", "value": 2 }, { "name": "poigne de fer", "value": 2 }, { "name": "bricolo", "value": 2 }, { "name": "sort: chatiment", "value": 2 }, { "name": "reparateur", "value": 2 }, { "name": "tenace", "value": 2 }, { "name": "deboussoler", "value": 2 }, { "name": "vierge de fer", "value": 1 }, { "name": "sombre devotion", "value": 1 }, { "name": "ecureuil", "value": 1 }, { "name": "pisteur", "value": 1 }, { "name": "sort: personne n'echappe a la mort", "value": 1 }, { "name": "inquietant", "value": 1 }, { "name": "surveillance", "value": 1 }, { "name": "prise de decision", "value": 1 }, { "name": "coup de grace", "value": 1 }, { "name": "chute de franklin", "value": 1 }, { "name": "peur contagieuse", "value": 1 }, { "name": "resistance a l'obscurite", "value": 1 }]

export function putJSON(killerPerks) {
    for (let i = 0; i < killerPerks.length; i++) {
        const perk = killerPerks[i];
        killerPerksJSON[perk] != undefined ? killerPerksJSON[perk] += 1 : killerPerksJSON[perk] = 1;
    }
    console.log({ killerPerksJSON });
    killerPerksJSON = killerPerksJSON.sort((a, b) => a.value - b.value).reverse();
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
