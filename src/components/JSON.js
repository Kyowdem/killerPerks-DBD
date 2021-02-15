const URLJSON = "https://json.extendsclass.com/bin/64c447c371b3";
var killerPerksJSON = {};

export function putJSON(killerPerks) {
    for (let i = 0; i < killerPerks.length; i++) {
        const perk = killerPerks[i];
        killerPerksJSON[perk] != undefined ? killerPerksJSON[perk] += 1 : killerPerksJSON[perk] = 1;
    }
    console.log({killerPerksJSON});
    // sendJSON();
}

export const getJSON = function () {
    const request = new XMLHttpRequest();
    request.open("GET", URLJSON, true);
    request.onreadystatechange = () => {
        if(request.readyState == 4) {
            const response = JSON.parse(request.responseText);
            console.log({response});
            killerPerksJSON = response;
        }
    };
    request.send();

    return killerPerksJSON;
}

const sendJSON = function () {
    const request = new XMLHttpRequest();
    request.open("PUT", URLJSON, true);
    request.send(JSON.stringify(killerPerksJSON));

    console.log('Les donnees ont été envoyé');
}
