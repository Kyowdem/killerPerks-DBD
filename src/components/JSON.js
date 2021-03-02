const URLJSON = "https://json.extendsclass.com/bin/64c447c371b3";
export var killerPerksJSON = getJSON();

export function putJSON(killerPerks) {
    for (let i = 0; i < killerPerks.length; i++) {
        const perk = killerPerks[i];

        var index = killerPerksJSON.findIndex(el => el.name == perk);
        if (index != -1)
            ++killerPerksJSON[index].value;
        else
            killerPerksJSON.push({ "name": `${perk}`, "value": 1 })

    }

    killerPerksJSON = killerPerksJSON.sort((a, b) => a.value - b.value).reverse();
    console.log({ killerPerksJSON });
    sendJSON();
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
