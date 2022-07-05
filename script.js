// Write your JavaScript code here!

// const { formSubmission } = require("./scriptHelper");
// const { myFetch, pickPlanet, addDestinationInfo, formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {
    //complete event listener upon clicking submit; 
    // let formSubmit = document.getElementById("formSubmit");
    let form = document.querySelector("form");
    // formSubmit.addEventListener("click", function (event) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let pilot = document.querySelector("input[name=pilotName]");
        let copilot = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoLevel = document.querySelector("input[name=cargoMass]");
        let list = document.getElementById('faultyItems');

        //call formSubmission to update list and validate user input
        formSubmission(document,list, pilot, copilot, fuelLevel, cargoLevel);

    //     if (
    //     pilot.value === "" ||
    //     copilot.value === "" ||
    //     fuelLevel.value === "" ||
    //     cargoLevel.value === "" ||
    // )    {
    //     alert("All fields must be completed.");
    // }
    });

    // if (
    //     pilot.value === "" ||
    //     copilot.value === "" ||
    //     fuelLevel.value === "" ||
    //     cargoLevel.value === "" ||
    // )    {
    //     alert("All fields must be completed.");
    // }

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