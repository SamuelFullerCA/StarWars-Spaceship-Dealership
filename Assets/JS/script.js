
// catchall variable of data that is not locked to a function
let searchedData;
let imageData;


//Function that pulls an array of starships based off of user input
async function searhApi(){

  //gets the value the user inputs in the search bar
  formValue = document.querySelector('#autocomplete-input').value


  //assigns the api with the search parameter of the users input to a variable
  userSearch = `https://swapi.dev/api/starships/?search=${formValue}`

  //fetches the data and stores it to the catchall variable
  const response2 = await fetch(userSearch)
  let fetchedData2 = await response2.json()
  console.log(fetchedData2)
  searchedData = fetchedData2

  
  //deletes the cards generated from previous search
  const previousCards = document.querySelector('#divWrap')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create cards
  starshipCards()

}

//function to generate card
async function starshipCards(){

  //create a div wrap outside the for loop that all the cards will live in
  //the wrap is used to clear the cards on a new search (see line 32-36)
  let divWrap = document.createElement('div')
  divWrap.setAttribute('id', 'divWrap')
  document.querySelector('#displayedCards').append(divWrap)

//for loop cenerating cards
  for(i = 0; i < searchedData.results.length; i++){

    //generates the card
    let starshipCard = document.createElement('section')
    //col s3 class allows it to accupy 3/12 of the row, so 4 cards per row
    starshipCard.setAttribute('class', ` card center-align starship ship${i}`)

 // NOTE API BLOCKED OUT TO AVOID HITTING MAX FETCHES
// UNLESS WORKING ON IMAGE FUNCTIONALITY USE PLACEHOLDER
    // test2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD3Lznxmq6WeZS28GXXXD3JQE5_m1PCatU&cx=21a0a191a509143c4&searchType=image&num=3&q=${searchedData.results[i].model}`
    // const response = await fetch(test2)
    // let fetchedData = await response.json()
    // console.log(fetchedData)
    // imageData = fetchedData

 
    //generates the image 
    let starshipImg =  document.createElement('IMG')
    // starshipImg.setAttribute('src', `${imageData.items[i].link}`)
    // placeholder for max image search
    starshipImg.src = './Assets/Images/Placeholder.jpg'
    starshipImg.setAttribute('width', '275')
    starshipImg.setAttribute('height', '150')
    starshipImg.setAttribute('class', 'imgCss')
      
  
    //generates the ship name
    let starshipName = document.createElement('h3')
    starshipName.setAttribute('class', 'activator')
    starshipName.textContent = `${searchedData.results[i].name}`

    //generates the word cost I put this here so the word "cost" sits about the actuall number
    //(there is probably a better way to do this)
    let costText = document.createElement('h4')
    costText.textContent = `Cost:`

    //generates the cost in credits
    let starshipCost = document.createElement('h4')
    starshipCost.textContent = `${searchedData.results[i].cost_in_credits} Credits`

    //seperated card body to allow customization difference between top half and lower half of card
    let cardBody = document.createElement('div')
    cardBody.setAttribute('id', `cardBodycss`)

    //generates the model text
    let starshipModel = document.createElement('p')
    starshipModel.textContent = `Model: ${searchedData.results[i].model}`

    // generates the MGLT text
    let shipMglt = document.createElement('p')
    shipMglt.textContent = `MGLT: ${searchedData.results[i].MGLT} `

    // generates the hyperdrive rating text
    let shipHdrive = document.createElement('p')
    shipHdrive.textContent = `Hyperdrive Rating: ${searchedData.results[i].hyperdrive_rating} `

    //generates the purchase button with materalize features
    let addCart = document.createElement('button')
    addCart.setAttribute('class', `waves-effect waves-light btn addCart`)
    addCart.setAttribute('id', `${searchedData.results[i].name}`)
    addCart.setAttribute('onclick', "M.toast({html: 'Added to cart!', classes: 'rounded'})")
    addCart.textContent = `Purchase`

    let revealActivator = document.createElement('i');
    revealActivator.setAttribute('class', 'material-icons right');
    revealActivator.textContent = "more_vert";

    let revealDiv = document.createElement('div');
    revealDiv.setAttribute('class', 'card-reveal');
    revealDiv.setAttribute("style", "background-color: #212121;");

    let revealSpan = document.createElement('span');
    revealSpan.setAttribute('class', 'card-title');
    revealSpan.setAttribute('style', 'color: white')
    revealSpan.textContent = 'Specifications'

    let revealName = document.createElement('p');
    revealName.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealName.textContent = `Name: ${searchedData.results[i].name}`;

    let revealModel = document.createElement('p');
    revealModel.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealModel.textContent = `Model: ${searchedData.results[i].model}`;

    let revealManufacturer = document.createElement('p');
    revealManufacturer.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealManufacturer.textContent = `Manufacturer: ${searchedData.results[i].manufacturer}`;

    let revealCost = document.createElement('p');
    revealCost.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCost.textContent = `Cost: ${searchedData.results[i].cost_in_credits}`;

    let revealLength = document.createElement('p');
    revealLength.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealLength.textContent = `Length: ${searchedData.results[i].length}`;

    let revealSpeed = document.createElement('p');
    revealSpeed.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealSpeed.textContent = `Atmospheric Speed: ${searchedData.results[i].max_atmosphering_speed}`;

    let revealCrew = document.createElement('p');
    revealCrew.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCrew.textContent = `Crew Size: ${searchedData.results[i].crew}`;

    let revealPassengers = document.createElement('p');
    revealPassengers.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealPassengers.textContent = `Passengers: ${searchedData.results[i].passengers}`;

    let revealCargo = document.createElement('p');
    revealCargo.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCargo.textContent = `Cargo Capacity: ${searchedData.results[i].cargo_capacity}`;

    let revealHyper = document.createElement('p');
    revealHyper.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealHyper.textContent = `Hyperdrive Rating: ${searchedData.results[i].hyperdrive_rating}`;

    let revealMGLT = document.createElement('p');
    revealMGLT.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealMGLT.textContent = `MGLT: ${searchedData.results[i].MGLT}`;

    let revealClass = document.createElement('p');
    revealClass.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealClass.textContent = `Starship Class: ${searchedData.results[i].starship_class}`;

    let revealClose = document.createElement('i');
    revealClose.setAttribute('class', 'material-icons right');
    revealClose.textContent = 'close'

    starshipName.append(revealActivator)
    revealSpan.append(revealClose, revealName, revealModel, revealClass, revealManufacturer, revealCost, revealLength, revealSpeed, revealCrew, revealPassengers, revealCargo, revealHyper, revealMGLT)

    revealDiv.append(revealSpan)












    //appends the card to the wrap
    divWrap.append(starshipCard)
    
    //appends the mode, mglt, and hdrive to the body
    cardBody.append(starshipModel, shipMglt, shipHdrive)
    //apends the name, image, cost text, cost, body, and purchse button to the card
    document.querySelector(`.ship${i}`).append(starshipName, starshipImg, costText, starshipCost, cardBody, addCart, revealDiv)

  }

}


//runs the fuctions on search button click
const search = document.querySelector("#searchBtn")
search.addEventListener('click', searhApi);




const hyperdriveClass = document.querySelector('#test5')
hyperdriveClass.addEventListener("click", function(){

  hclassValue = document.querySelector('#test5').value
  localStorage.setItem('hclassValue',  hclassValue)

})


// hyperdriveClass.addEventListener("mouseup", () => {

//   hclassValue = document.querySelector('#test5').value
//     localStorage.setItem('hclassValue',  hclassValue)

// });

  // priceRange = [];

  // starshipClass = [];

  // pictureStyle;

  // unavaliableStarships;

  // supportPass;

  // nonFTL;
const checkout = document.getElementById('buttonclick')
checkout.addEventListener('click' , function(){
    window.location.href = "./checkout.html" 
})
