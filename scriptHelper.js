// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {    
   let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src= '${imageUrl}'>
                 `    
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null) {
        return 'Empty'
    } else if (isNaN(testInput)) {
        return 'Not a Number'
    } else if ((!isNaN(Number(testInput)))){
        return 'Is a Number'
    }

}

function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');


    if (validateInput(pilot) === 'Empty'|| validateInput(copilot) === 'Empty'|| 
    validateInput(fuelLevel) === 'Empty'||validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required');
    }
    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number' || validateInput(pilot)=== 'Is a Number' || validateInput(copilot)=== 'Is a Number') {
        alert('Please enter valid information for each field!');
    } 
    else if (validateInput(fuelLevel) === 'Is a Number' && validateInput(cargoLevel) === 'Is a Number' && validateInput(pilot)=== 'Not a Number' && validateInput(copilot)=== 'Not a Number'){
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = 'hidden';
    }


    if (Number(fuelLevel) < 10000 && Number(cargoLevel) < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (Number(fuelLevel) >= 10000 && Number(cargoLevel) >= 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (Number(fuelLevel) < 10000 && Number(cargoLevel) >= 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (Number(fuelLevel) >= 10000 && Number(cargoLevel) < 10000) {
        list.style.visibility = `visible`;
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        launchStatus.innerHTML = 'Shuttle is Ready for Launch';
        launchStatus.style.color = 'rgb(65, 159, 106)';
    }
}
// formSubmission(window.document, list, "Chris", "Bob",fuel:10000, cargo:1);

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
