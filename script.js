function locationISS() {
    let locationISSnow = {
        longitude: 0,
        latitude: 0
    };

    const request = new XMLHttpRequest();
    request.open('GET', 'http://api.open-notify.org/iss-now.json', false);
    request.send();

    let posicionJSON = JSON.parse(request.response);

    locationISSnow.longitude = posicionJSON.iss_position.longitude;
    locationISSnow.latitude = posicionJSON.iss_position.latitude;

    return locationISSnow;
}

function crewISS() {
    let crewISSnow = [];

    const request = new XMLHttpRequest();
    request.open('GET', 'http://api.open-notify.org/astros.json', false);
    request.send();

    let crewJSON = JSON.parse(request.response);

    for (let i = 0; i < crewJSON.people.length; i++) {
        if (crewJSON.people[i].craft == "ISS"){
            crewISSnow.push(crewJSON.people[i].name);
        }
    }

    return crewISSnow;
}

function dateUTC() {
    let dateUTCnow = {
        hour: 0,
        minute: 0,
        day: '',
        date: 0,
        month: '',
        year: 0
    };

    let daysWeekList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let MonthList = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

    dateUTCnow.hour = new Date().getUTCHours();
    dateUTCnow.minute = new Date().getUTCMinutes();
    dateUTCnow.day = daysWeekList[new Date().getDay()];
    dateUTCnow.date = new Date().getDate();
    dateUTCnow.month = MonthList[new Date().getUTCMonth()];
    dateUTCnow.year = new Date().getUTCFullYear();

    return dateUTCnow;
}

function render() {
    const initLocationISS = locationISS();
    const initdateUTC = dateUTC();
    const initcrewISS = crewISS();
    document.getElementById("data-location-ISS").innerHTML = `longitude: ${initLocationISS.longitude}, latitude: ${initLocationISS.latitude}`;
    document.getElementById("time-hours").innerHTML = `Current UTC time: ${initdateUTC.hour}:${initdateUTC.minute}`
    document.getElementById("time-data").innerHTML = `${initdateUTC.day}, ${initdateUTC.date} ${initdateUTC.month} ${initdateUTC.year}`;
    
    document.getElementById("map-wrapper").innerHTML = `<div id="map" class="map-now-ISS"></div>`;
    DG.then(function () {
        var map = DG.map('map', {
            center: [initLocationISS.latitude, initLocationISS.longitude],
            zoom: 3
        });
    
        DG.marker([initLocationISS.latitude, initLocationISS.longitude]).addTo(map).bindPopup('ISS');
    });

    document.getElementById("crewWrapper").innerHTML = ``;

    for (let i = 0; i < initcrewISS.length; i++) {
        let pioplewrapper = document.createElement('div');
        pioplewrapper.className = "crew-piople";
        pioplewrapper.innerHTML = `
        <i class="fas fa-user-alt"></i>
        <p>${initcrewISS[i]}</p>
        `;
        crewWrapper.append(pioplewrapper);
    }
};

render();

setInterval(() => {
    render()
}, 5000);