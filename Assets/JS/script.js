
// catchall variable of data that is not locked to a function
let searchedData = []
let imageData;
let classArray;
let searchedDataSpecific;


//Function that pulls an array of starships based off of user input
async function searhApi(){

  //gets the value the user inputs in the search bar
  formValue = document.querySelector('#autocomplete-input').value


  //assigns the api with the search parameter of the users input to a variable
  
  //change 1 to 4 to get att 36 results
  
  userSearch = `https://swapi.tech/api/starships/?name=${formValue}`
  
  
  //fetches the data and stores it to the catchall variable
  const response2 = await fetch(userSearch)
  let fetchedData2 = await response2.json()
  console.log(fetchedData2)

  searchedDataSpecific = fetchedData2
  
  console.log(searchedDataSpecific)
  //deletes the cards generated from previous search
  const previousCards = document.querySelector('#divWrap')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create cards
  starshipCards()
  
}

async function searhApiFiltered(){

  
  //gets the value the user inputs in the search bar
  // formValue = document.querySelector('#autocomplete-input').value


  //assigns the api with the search parameter of the users input to a variable
  
  //change 1 to 4 to get att 36 results
  // for(let i = 2; i <= 40; i++){
  // // userSearch = `https://swapi.dev/api/starships/?search=${formValue}`
  // userSearch = `https://swapi.tech/api/starships/${i}`
  
  // //fetches the data and stores it to the catchall variable
  // const response2 = await fetch(userSearch)
  
  // let fetchedData2 = await response2.json()
  // console.log(fetchedData2)

  // // let arrayLength = fetchedData2.results.length

  // if (fetchedData2.message ==='Not found'){
  //   continue
  // }

  // searchedData.push(fetchedData2.result.properties)

  // localStorage.setItem('swapitech', JSON.stringify(searchedData))

  // searchedData = 
  

  // fetchedData2
  // }

  
  //deletes the cards generated from previous search
  const previousCards = document.querySelector('#divWrap')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create cards
  filteredCards()
  
}

// function to generate card
async function starshipCards(){

  //create a div wrap outside the for loop that all the cards will live in
  //the wrap is used to clear the cards on a new search (see line 32-36)
  let divWrap = document.createElement('div')
  divWrap.setAttribute('id', 'divWrap')
  document.querySelector('#displayedCards').append(divWrap)

//for loop cenerating cards
  for(i = 0; i < searchedDataSpecific.result.length; i++){

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

    starshipName.textContent = `${searchedDataSpecific.result[i].properties.name}`

    //generates the word cost I put this here so the word "cost" sits about the actuall number
    //(there is probably a better way to do this)
    let costText = document.createElement('h4')
    costText.textContent = `Cost:`

    //generates the cost in credits
    let starshipCost = document.createElement('h4')
    if(searchedDataSpecific.result[i].properties.cost_in_credits === 'unknown'){
      starshipCost.textContent = 'Unavaliable'
    }else {
    starshipCost.textContent = `${searchedDataSpecific.result[i].properties.cost_in_credits} Credits`
    }

    //seperated card body to allow customization difference between top half and lower half of card
    let cardBody = document.createElement('div')
    cardBody.setAttribute('id', `cardBodycss`)

    //generates the model text
    let starshipModel = document.createElement('p')
    starshipModel.textContent = `Model: ${searchedDataSpecific.result[i].properties.model}`

    // generates the MGLT text
    let shipMglt = document.createElement('p')
    shipMglt.textContent = `MGLT: ${searchedDataSpecific.result[i].properties.MGLT} `

    // generates the hyperdrive rating text
    let shipHdrive = document.createElement('p')
    shipHdrive.textContent = `Hyperdrive Rating: ${searchedDataSpecific.result[i].properties.hyperdrive_rating} `

    //generates the purchase button with materalize features
    let addCart = document.createElement('button')
    addCart.setAttribute('class', `waves-effect waves-light btn addCart`)
    addCart.setAttribute('id', `${searchedDataSpecific.result[i].properties.name}`)
    addCart.setAttribute('onclick', "M.toast({html: 'Added to cart!', classes: 'rounded'})")
    addCart.textContent = `Purchase`
    // document.querySelector('displayCards').append(starshipName,starshipImg, costText)
 

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

    revealName.textContent = `Name: ${searchedDataSpecific.result[i].properties.name}`;

    let revealModel = document.createElement('p');
    revealModel.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealModel.textContent = `Model: ${searchedDataSpecific.result[i].properties.model}`;

    let revealManufacturer = document.createElement('p');
    revealManufacturer.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealManufacturer.textContent = `Manufacturer: ${searchedDataSpecific.result[i].properties.manufacturer}`;

    let revealCost = document.createElement('p');
    revealCost.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCost.textContent = `Cost: ${searchedDataSpecific.result[i].properties.cost_in_credits}`;

    let revealLength = document.createElement('p');
    revealLength.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealLength.textContent = `Length: ${searchedDataSpecific.result[i].properties.length}`;

    let revealSpeed = document.createElement('p');
    revealSpeed.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealSpeed.textContent = `Atmospheric Speed: ${searchedDataSpecific.result[i].properties.max_atmosphering_speed}`;

    let revealCrew = document.createElement('p');
    revealCrew.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCrew.textContent = `Crew Size: ${searchedDataSpecific.result[i].properties.crew}`;

    let revealPassengers = document.createElement('p');
    revealPassengers.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealPassengers.textContent = `Passengers: ${searchedDataSpecific.result[i].properties.passengers}`;

    let revealCargo = document.createElement('p');
    revealCargo.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCargo.textContent = `Cargo Capacity: ${searchedDataSpecific.result[i].properties.cargo_capacity}`;

    let revealHyper = document.createElement('p');
    revealHyper.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealHyper.textContent = `Hyperdrive Rating: ${searchedDataSpecific.result[i].properties.hyperdrive_rating}`;

    let revealMGLT = document.createElement('p');
    revealMGLT.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealMGLT.textContent = `MGLT: ${searchedDataSpecific.result[i].properties.MGLT}`;

    let revealClass = document.createElement('p');
    revealClass.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealClass.textContent = `Starship Class: ${searchedDataSpecific.result[i].properties.starship_class}`;


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

<<<<<<<<< Temporary merge branch 1
const searchFiltered = document.querySelector("#filteredSearchBtn")
searchFiltered.addEventListener('click', searhApiFiltered);


//local storage for hyperdrive class filter
const hyperdriveClass = document.querySelector('#rangeSlider')
hyperdriveClass.addEventListener("click", function(){
  hclassValue = document.querySelector('#rangeSlider').value
  localStorage.setItem('hclassValue',  hclassValue)
})


//local storage for unavaliable starship filter
const unavaliableNo = document.querySelector('#unavaNo')
unavaliableNo.addEventListener("click", function(){
    localStorage.setItem('unavaliableShip',  "no")
})
const unavaliableYes = document.querySelector('#unavaYes')
unavaliableYes.addEventListener("click", function(){
    localStorage.setItem('unavaliableShip',  "yes")
})

//local storage for support passengers filter
const passengersNo = document.querySelector('#passengersNo')
passengersNo.addEventListener("click", function(){
    localStorage.setItem('suppotPassengers',  "no")
})
const passengersYes = document.querySelector('#passengersYes')
passengersYes.addEventListener("click", function(){
    localStorage.setItem('suppotPassengers',  "yes")
})

//dropdown multi-selct functionality and array
document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelector("select");
  M.FormSelect.init(selects, {});
  const selectOption = document.querySelector("#option-select");
    
  selectOption.addEventListener("change", function () {
    const instance = M.FormSelect.getInstance(selectOption);
    const selectedValues = instance.getSelectedValues();
    console.log(selectedValues);
    classArray = selectedValues
  });
});


//clears the advance filter on refresh
localStorage.setItem('hclassValue', '4')
localStorage.setItem("suppotPassengers", 'yes')
localStorage.setItem("unavaliableShip", 'yes')
localStorage.setItem('priceArray', JSON.stringify([]))
localStorage.setItem("$added", 'false')
localStorage.setItem("$$added", 'false')
localStorage.setItem("$$$added", 'false')
localStorage.setItem("$$$$added", 'false')
localStorage.setItem("$$$$$added", 'false')

// Price array section
const priceRange1 = document.querySelector('#price1')
priceRange1.addEventListener("click", function(){
  
  if(localStorage.getItem("$added") === 'true'){
    priceArray = []
  
    let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
    
    if(pulledArray === null){
      pulledArray = priceArray
    }else {
      priceArray = pulledArray
    }
    
    priceArray = priceArray.filter(e => e !== 'range1')
    
    window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    localStorage.setItem("$added", 'false')
  }else{
    priceArray = []
  
  let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
  
  if(pulledArray === null){
    pulledArray = priceArray
  }else {
    priceArray = pulledArray
  }
  
  priceArray.push('range1')
  
  window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    localStorage.setItem("$added", 'true')
  
  }
  })

const priceRange2 = document.querySelector('#price2')
priceRange2.addEventListener("click", function(){

if(localStorage.getItem("$$added") === 'true'){
  priceArray = []
  
  let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
  
  if(pulledArray === null){
    pulledArray = priceArray
  }else {
    priceArray = pulledArray
  }
  
  priceArray = priceArray.filter(e => e !== 'range2')
  
  window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
  localStorage.setItem("$$added", 'false')
}else{
  priceArray = []

let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))

if(pulledArray === null){
  pulledArray = priceArray
}else {
  priceArray = pulledArray
}

priceArray.push('range2')

window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
  localStorage.setItem("$$added", 'true')

}
})

const priceRange3 = document.querySelector('#price3')
priceRange3.addEventListener("click", function(){

if(localStorage.getItem("$$$added") === 'true'){
  priceArray = []
  
  let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
  
  if(pulledArray === null){
    pulledArray = priceArray
  }else {
    priceArray = pulledArray
  }
  
  priceArray = priceArray.filter(e => e !== 'range3')
  
  window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
  localStorage.setItem("$$$added", 'false')
}else{
  priceArray = []

let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))

if(pulledArray === null){
  pulledArray = priceArray
}else {
  priceArray = pulledArray
}

priceArray.push('range3')

window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
  localStorage.setItem("$$$added", 'true')

}
})

const priceRange4 = document.querySelector('#price4')
priceRange4.addEventListener("click", function(){

  if(localStorage.getItem("$$$$added") === 'true'){
    priceArray = []
  
    let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
    
    if(pulledArray === null){
      pulledArray = priceArray
    }else {
      priceArray = pulledArray
    }
    
    priceArray = priceArray.filter(e => e !== 'range4')
    
    window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    localStorage.setItem("$$$$added", 'false')
  }else{
    priceArray = []
  
  let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
  
  if(pulledArray === null){
    pulledArray = priceArray
  }else {
    priceArray = pulledArray
  }
  
  priceArray.push('range4')
  
  window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    localStorage.setItem("$$$$added", 'true')
  
  }
  })

const priceRange5 = document.querySelector('#price5')
priceRange5.addEventListener("click", function(){

  if(localStorage.getItem("$$$$$added") === 'true'){
    priceArray = []
  
    let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
    
    if(pulledArray === null){
      pulledArray = priceArray
    }else {
      priceArray = pulledArray
    }
    
    priceArray = priceArray.filter(e => e !== 'range5')
    
    window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    localStorage.setItem("$$$$$added", 'false')
  }else{
    priceArray = []
  
  let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
  
  if(pulledArray === null){
    pulledArray = priceArray
  }else {
    priceArray = pulledArray
  }
  
  priceArray.push('range5')
  
  window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    localStorage.setItem("$$$$$added", 'true')
  
  }
})
// Price array section end




const checkout = document.getElementById('buttonclick')
checkout.addEventListener('click' , function(){
    window.location.href = "./checkout.html" 
})


async function filteredCards(){

  //create a div wrap outside the for loop that all the cards will live in
  //the wrap is used to clear the cards on a new search (see line 32-36)
  let divWrap = document.createElement('div')
  divWrap.setAttribute('id', 'divWrap')
  document.querySelector('#displayedCards').append(divWrap)

//for loop cenerating cards
  loop1: for(i = 0; i < searchedData.length; i++){

    //generates the card
    let starshipCard = document.createElement('section')
    //col s3 class allows it to accupy 3/12 of the row, so 4 cards per row
    starshipCard.setAttribute('class', ` card center-align starship ship${i}`)

 // NOTE API BLOCKED OUT TO AVOID HITTING MAX FETCHES
// UNLESS WORKING ON IMAGE FUNCTIONALITY USE PLACEHOLDER
    // test2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD3Lznxmq6WeZS28GXXXD3JQE5_m1PCatU&cx=21a0a191a509143c4&searchType=image&num=3&q=${searchedData[i].model}`
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
    starshipName.textContent = `${searchedData[i].name}`

    //generates the word cost I put this here so the word "cost" sits about the actuall number
    //(there is probably a better way to do this)
    let costText = document.createElement('h4')
    costText.textContent = `Cost:`

    //unavaliable filter
    if(localStorage.getItem('unavaliableShip') === 'no'){
      if (searchedData[i].cost_in_credits === 'unknown'){
        continue;
      }
    }
    
    //price filters *not done*
    let filterArray = JSON.parse(localStorage.getItem(`priceArray`))
    let costFilterVal = searchedData[i].cost_in_credits

    let numberVal = parseInt(costFilterVal)
    console.log(numberVal)

    if(filterArray.length >= 1){
      console.log('passed 0')
      if(filterArray.includes('range1') || filterArray.includes('range2') || filterArray.includes('range3') || filterArray.includes('range4') || filterArray.includes('range5')){
        if(numberVal > 100001){
          if(filterArray.includes('range2') || filterArray.includes('range3') || filterArray.includes('range4') || filterArray.includes('range5')){
            if(numberVal > 1000001){
              if(filterArray.includes('range3') || filterArray.includes('range4') || filterArray.includes('range5')){
                if(numberVal > 10000000){
                  if(filterArray.includes('range4') || filterArray.includes('range5')){
                    if(numberVal > 100000000){
                      if(filterArray.includes("range5")){
                        if(numberVal > 1000000000000000){
                        }else if(localStorage.getItem('$$$$added') === 'false' ){
                          continue
                        }
                      }else{
                        continue
                      }
                    }else if(localStorage.getItem('$$$$added') === 'false' ){
                      continue
                    }
                  }else{
                    continue
                  }
                }else if(localStorage.getItem('$$$added') === 'false' ){
                  continue
                }
              }else{
                continue
              }
            }else if(localStorage.getItem('$$added') === 'false' ){
              continue
            }
          }else{
            continue
          }
        }else if(localStorage.getItem('$added') === 'false' ){
          continue
        }
      }
     } 
    

    
  

    



    //generates the cost in credits
    let starshipCost = document.createElement('h4')
    if(searchedData[i].cost_in_credits === 'unknown'){
      starshipCost.textContent = 'Unavaliable'
    }else {
    starshipCost.textContent = `${searchedData[i].cost_in_credits} Credits`
    }

    //seperated card body to allow customization difference between top half and lower half of card
    let cardBody = document.createElement('div')
    cardBody.setAttribute('id', `cardBodycss`)

    //generates the model text
    let starshipModel = document.createElement('p')
    starshipModel.textContent = `Model: ${searchedData[i].model}`

    // generates the MGLT text
    let shipMglt = document.createElement('p')
    shipMglt.textContent = `MGLT: ${searchedData[i].MGLT} `


    if(localStorage.getItem('hclassValue') !== 4){
      if(localStorage.getItem('hclassValue') == 3){
        if(searchedData[i].hyperdrive_rating > 3)
        continue
      }else if (localStorage.getItem('hclassValue') == 2){
        if(searchedData[i].hyperdrive_rating > 2)
        continue
      }else if (localStorage.getItem('hclassValue') == 1){
        if(searchedData[i].hyperdrive_rating > 1)
        continue
      }else if (localStorage.getItem('hclassValue') == 0){
        if(searchedData[i].hyperdrive_rating > 0)
        continue
      }


    }
    // generates the hyperdrive rating text
    let shipHdrive = document.createElement('p')
    shipHdrive.textContent = `Hyperdrive Rating: ${searchedData[i].hyperdrive_rating} `

    //generates the purchase button with materalize features
    let addCart = document.createElement('button')
    addCart.setAttribute('class', `waves-effect waves-light btn addCart`)
    addCart.setAttribute('id', `${searchedData[i].name}`)
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
    revealName.textContent = `Name: ${searchedData[i].name}`;

    let revealModel = document.createElement('p');
    revealModel.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealModel.textContent = `Model: ${searchedData[i].model}`;

    let revealManufacturer = document.createElement('p');
    revealManufacturer.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealManufacturer.textContent = `Manufacturer: ${searchedData[i].manufacturer}`;

    let revealCost = document.createElement('p');
    revealCost.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCost.textContent = `Cost: ${searchedData[i].cost_in_credits}`;

    let revealLength = document.createElement('p');
    revealLength.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealLength.textContent = `Length: ${searchedData[i].length}`;

    let revealSpeed = document.createElement('p');
    revealSpeed.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealSpeed.textContent = `Atmospheric Speed: ${searchedData[i].max_atmosphering_speed}`;

    let revealCrew = document.createElement('p');
    revealCrew.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCrew.textContent = `Crew Size: ${searchedData[i].crew}`;

    //Can support passengers filter
    if(localStorage.getItem('suppotPassengers') === 'no'){
      if (searchedData[i].passengers === "0" || searchedData[i].passengers === "unknown" || searchedData[i].passengers === "n/a"){
      }else {
        continue;
      }
    }

    let revealPassengers = document.createElement('p');
    revealPassengers.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealPassengers.textContent = `Passengers: ${searchedData[i].passengers}`;

    let revealCargo = document.createElement('p');
    revealCargo.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCargo.textContent = `Cargo Capacity: ${searchedData[i].cargo_capacity}`;

    let revealHyper = document.createElement('p');
    revealHyper.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealHyper.textContent = `Hyperdrive Rating: ${searchedData[i].hyperdrive_rating}`;

    let revealMGLT = document.createElement('p');
    revealMGLT.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealMGLT.textContent = `MGLT: ${searchedData[i].MGLT}`;


    
  //filter conditions for starship class
  dataString = searchedData[i].starship_class
  let lowerCase = dataString.toLowerCase()
  
    otherclass = ['ship',]
    if(classArray !== undefined){
      loop2: for(let j = 0; j < classArray.length; j++){
        if(lowerCase.includes(classArray[j])){
          break
        }else if(j === classArray.length -1 ) {
          continue loop1
        }
      }
    }



    let revealClass = document.createElement('p');
    revealClass.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealClass.textContent = `Starship Class: ${searchedData[i].starship_class}`;

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


pageload()

async function pageload(){

if(JSON.parse(localStorage.getItem(`swapitech`)) === null || JSON.parse(localStorage.getItem(`swapitech`)) === undefined || JSON.parse(localStorage.getItem(`swapitech`)) === ""){
for(let i = 2; i <= 40; i++){
  // userSearch = `https://swapi.dev/api/starships/?search=${formValue}`
  userSearch = `https://swapi.tech/api/starships/${i}`
  
  //fetches the data and stores it to the catchall variable
  const response2 = await fetch(userSearch)
  
  let fetchedData2 = await response2.json()
  console.log(fetchedData2)

  // let arrayLength = fetchedData2.results.length

  if (fetchedData2.message ==='Not found'){
    continue
  }

  searchedData.push(fetchedData2.result.properties)

  localStorage.setItem('swapitech', JSON.stringify(searchedData))

  searchedData = JSON.parse(localStorage.getItem(`swapitech`))

  
}

}
  searchedData = JSON.parse(localStorage.getItem(`swapitech`))
  console.log(searchedData)
}