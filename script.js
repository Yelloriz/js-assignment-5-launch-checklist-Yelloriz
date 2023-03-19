// Write your JavaScript code here!

window.addEventListener("load", ()=> {
    const form = document.querySelector("form");
    let list = document.getElementById('faultyItems');
    list.style.visibility = 'hidden';
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        //List DOM
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;

        //use formsubmission to validate and update list
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    })

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planet = pickPlanet(listedPlanets);
       let name = planet.name;
       let diameter = planet.diameter;
       let star = planet.star;
       let distance = planet.distance;
       let imageUrl = planet.image;
       let moons = planet.moons;
       addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
    })
   
});

fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
    response.json().then(function(json){
        const missionTarget = document.getElementById('missionTarget');
        const randomNumber = Math.floor(Math.random() * json.length - 1);
        missionTarget.innerHTML = `
        <ol>
        <li>Name: ${json[randomNumber].name}</li>
        <li>Diameter: ${json[randomNumber].diameter}</li>
        <li>Star: ${json[randomNumber].star}</li>
        <li>Distance from Earth: ${json[randomNumber].distance}</li>
        <li>Number of Moons: ${json[randomNumber].moons}</li>
        </ol>
        <img src="${json[randomNumber].image}">
        `;
    });
});