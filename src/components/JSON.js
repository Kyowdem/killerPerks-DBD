const URLJSON = "https://json.extendsclass.com/bin/64c447c371b3";
// export var killerPerksJSON = getJSON();
export var killerPerksJSON = { "chilli barbecue": 17, "sort: ruine": 10, "sort: immortel": 3, "vocation de l'infirmière": 10, "deboussoler": 2, "le tour est joué": 10, "tenace": 2, "surveillance et maltraitance": 2, "gardons le meilleur pour la fin": 3, "sort: mangeur d'espoir": 6, "reparateur": 2, "discorde": 5, "thanatophobie": 6, "sort: chatiment": 2, "boucher sadique": 5, "espion de l'ombre": 5, "murmures": 8, "bricolo": 2, "murmure amer": 4, "poigne de fer": 2, "cran dement": 2, "resistance a l'obscurite": 1, "sort: berceuse de la chasseuse": 2, "intervention malefique": 7, "peur contagieuse": 1, "chien de sang": 2, "surcharge": 1, "chute de franklin": 1, "coup de grace": 1, "prise de decision": 1, "je vous ecoute": 1, "sort: le troisieme sceau": 1, "force brute": 2, "surveillance": 1, "frissons palpitants": 2, "inquietant": 1, "sort: personne n'echappe a la mort": 1, "stridor": 1, "pisteur": 1 }

export function putJSON(killerPerks) {
    for (let i = 0; i < killerPerks.length; i++) {
        const perk = killerPerks[i];
        killerPerksJSON[perk] != undefined ? killerPerksJSON[perk] += 1 : killerPerksJSON[perk] = 1;
    }
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
