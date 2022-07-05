// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `
}

//add validation - names must be STRING; fuel/cargo are NUMBERS
function validateInput(testInput) {
   if (testInput === "")    {
       return 'Empty'
   } else if (!isNaN(testInput))    {
       return 'Is a Number'
   } else {
       return 'Not a Number'
   }
}

//DOCUMENT parameter - strings for all; use input values to update HTML;
//window alert if all fields are not completed
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   //input references
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let launchStatus = document.getElementById('launchStatus');

   if (pilot.value === "" ||
       copilot.value === "" ||
       fuelLevel.value === "" ||
       cargoLevel.value === ""
   ) { alert("All fields must be completed.");
   }

   //conditions to check and update launch status
   //names are strings, fuel/cargo are numbers
   else if (validateInput(pilot.value) === 'Is a Number' || validateInput(copilot.value) === 'Is a Number') {
       alert("Enter only letters for pilot and co-pilot.");
   } else if (validateInput(fuelLevel.value) === 'Not a Number' || validateInput(cargoLevel.value) === 'Not a Number')  {
       alert("Enter only numerical values for fuel level and cargo mass.");
   } //if the above 2  check out, update pilot status
   else {
       list.style.visibility = 'visible';
       pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
       copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;
   }

   //fuel levels & cargo levels with update to faulty items list
   //tested multiple scenarios with diff values and each status update works
   if (Number(fuelLevel.value) < 10000) {
       list.style.visibility = 'visible';
       launchStatus.style.color = 'red';
       launchStatus.innerHTML = `Shuttle not ready for launch`;
       fuelStatus.innerHTML = `Fuel level too low for launch`;
   } else if (Number(cargoLevel.value) > 10000) {
        list.style.visibility = 'visible';
        launchStatus.style.color = 'red';
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        cargoStatus.innerHTML = `Cargo is too heavy for launch`;
   } else if (Number(cargoLevel.value) < 10000 && Number(fuelLevel.value) > 10000)  {
       list.style.visibility = 'visible';
       launchStatus.style.color = 'green';
       launchStatus.innerHTML = `Shuttle is ready for launch`;
       cargoStatus.innerHTML = `Cargo mass low enough for launch`;
       fuelStatus.innerHTML = `Fuel level high enough for launch`;
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
        });

    return planetsReturned;
}

//index variable to hold place of random planet to return
function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
