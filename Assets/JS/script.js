
// catchall variable of data that is not locked to a function
let searchedData = [];
let imageData;
let classArray;
let searchedDataSpecific;
let cartItems=[];
let cartBtn1;
let cartBtn2;

//function that pulls an array of starships based off of user input
async function searhApi(){

  //gets the value the user inputs in the search bar
  formValue = document.querySelector('#autocomplete-input').value


  //assigns the api with the search parameter of the users input to a variable
  userSearch = `https://swapi.tech/api/starships/?name=${formValue}`

  //fetches the data and stores it to the catchall variable
  const response2 = await fetch(userSearch)
  let fetchedData2 = await response2.json()
  console.log(fetchedData2)
  searchedDataSpecific = fetchedData2

  //deletes the cards generated from previous search
  const previousCards = document.querySelector('#divWrap')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create cards
  starshipCards() 
}

//function that pulls an array of starships based on filter queries
async function searhApiFiltered(){

  //deletes the cards generated from previous search
  const previousCards = document.querySelector('#divWrap')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create cards
  filteredCards()
}

// function to generate card from the search button
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
    starshipCard.setAttribute('class', ` card center-align starship ship${i}`)

    //saftey net to run our two backup api keys when the previous one is maxed out (max is 100 searches)
    //starts by checking if image type selected by user is google image api
    if(localStorage.getItem('imageType') === 'googleApi'){

      //assigns the api fetch link to a variable
      test2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBI_Z3c7bX95-Or-Jth1eEFfXc2kuqMjfA&cx=c45afde7ad36d4a52&searchType=image&num=5&q=${searchedDataSpecific.result[i].properties.model}`
      
      //fetches the data and stores it in a catchall variable
      const response = await fetch(test2)
      let fetchedData = await response.json()
      console.log(fetchedData)
      imageData = fetchedData
      console.log('key1')

      //set a variable that finds the length of the data gather from the fetch wich should be 5 as it is pulling 5 images
      let maxxed = Object.keys(imageData).length

      //if the api key is maxed out it the object fetched is only 1 in length and the 1 is error
      //repeat process for two more keys
      if (maxxed === 1){
        backup1 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAgnhWXX_mxAWDwubyCUarTjY_Ba61uUL4&cx=21a0a191a509143c4&searchType=image&num=5&q=${searchedDataSpecific.result[i].properties.model}`
        const response = await fetch(backup1)
        let fetchedData = await response.json()
        console.log(fetchedData)
        imageData = fetchedData
        console.log('key2')
        let maxxed = Object.keys(imageData).length

        if(maxxed === 1){
          backup2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBkW2WaIkGC2twtTZJVrgNQUuDBFv5Ut90&cx=d51f763a8ffcb4269&searchType=image&num=5&q=${searchedDataSpecific.result[i].properties.model}`
          const response = await fetch(backup1)
          let fetchedData = await response.json()
          console.log(fetchedData)
          imageData = fetchedData
          console.log('key3')
          let maxxed = Object.keys(imageData).length

          if (maxxed === 1){

            //once all 3 keys are maxed out it defaults to placeholder images
            localStorage.setItem('imageType', 'placeholders')
          }
        }
      }
    } 

    //generates the image 
    let starshipImg =  document.createElement('IMG')
    //if statement to generate the image based of the filter selected
    if(localStorage.getItem('imageType') === 'placeholders'){
      starshipImg.src = './Assets/Images/Placeholder.jpg'
    }else{
      for(let l = 0; l < imageData.items.length; l++){
        if(imageData.items[l].fileFormat === "image/"){
          continue
        }else{
          starshipImg.setAttribute('src', `${imageData.items[l].link}`)
          break
        }
    }
  }
    
    //sets image size and attributes
    starshipImg.setAttribute('width', '275')
    starshipImg.setAttribute('height', '150')
    starshipImg.setAttribute('class', 'imgCss')
      
  
    //generates the ship name
    let starshipName = document.createElement('h3')
    starshipName.setAttribute('class', 'activator')
    starshipName.textContent = `${searchedDataSpecific.result[i].properties.name}`

    //generates the word cost I put this here so the word "cost" sits about the actuall number
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
    addCart.setAttribute('value', `${searchedDataSpecific.result[i].properties.cost_in_credits}`)
    addCart.setAttribute('id', `${searchedDataSpecific.result[i].properties.name}`)
    addCart.setAttribute('onclick', "M.toast({html: 'Added to cart!', classes: 'rounded'})")
    addCart.textContent = `Purchase`
   
   //                                               vv  STAR OF CARD REVEAL SECTION vv
   
    //generates the activator for card reveal
    let revealActivator = document.createElement('i');
    revealActivator.setAttribute('class', 'material-icons right');
    revealActivator.textContent = "more_vert";

    //generates the div for card reveal
    let revealDiv = document.createElement('div');
    revealDiv.setAttribute('class', 'card-reveal');
    revealDiv.setAttribute("style", "background-color: #212121;");

    //generates the span for card reveal
    let revealSpan = document.createElement('span');
    revealSpan.setAttribute('class', 'card-title');
    revealSpan.setAttribute('style', 'color: white')
    revealSpan.textContent = 'Specifications'

    //generates the name value for card reveal
    let revealName = document.createElement('p');
    revealName.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealName.textContent = `Name: ${searchedDataSpecific.result[i].properties.name}`;

    //generates the model value for card reveal 
    let revealModel = document.createElement('p');
    revealModel.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealModel.textContent = `Model: ${searchedDataSpecific.result[i].properties.model}`;

    //generates the manufacturer value for card reveal
    let revealManufacturer = document.createElement('p');
    revealManufacturer.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealManufacturer.textContent = `Manufacturer: ${searchedDataSpecific.result[i].properties.manufacturer}`;

    //generates the cost value for card reveal
    let revealCost = document.createElement('p');
    revealCost.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCost.textContent = `Cost: ${searchedDataSpecific.result[i].properties.cost_in_credits}`;

    //generates the length value for card reveal
    let revealLength = document.createElement('p');
    revealLength.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealLength.textContent = `Length: ${searchedDataSpecific.result[i].properties.length}`;

    //generates the atmosphering speed value for card reveal
    let revealSpeed = document.createElement('p');
    revealSpeed.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealSpeed.textContent = `Atmospheric Speed: ${searchedDataSpecific.result[i].properties.max_atmosphering_speed}`;

    //generates the crew value for card reveal
    let revealCrew = document.createElement('p');
    revealCrew.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCrew.textContent = `Crew Size: ${searchedDataSpecific.result[i].properties.crew}`;

    //generates the passengers value for card reveal
    let revealPassengers = document.createElement('p');
    revealPassengers.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealPassengers.textContent = `Passengers: ${searchedDataSpecific.result[i].properties.passengers}`;

    //generates the cargo value for card reveal
    let revealCargo = document.createElement('p');
    revealCargo.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCargo.textContent = `Cargo Capacity: ${searchedDataSpecific.result[i].properties.cargo_capacity}`;

    //generates the hyperdrive rating value for card reveal
    let revealHyper = document.createElement('p');
    revealHyper.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealHyper.textContent = `Hyperdrive Rating: ${searchedDataSpecific.result[i].properties.hyperdrive_rating}`;

    //generates the mglt value for card reveal
    let revealMGLT = document.createElement('p');
    revealMGLT.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealMGLT.textContent = `MGLT: ${searchedDataSpecific.result[i].properties.MGLT}`;

    //generates the class value for card reveal
    let revealClass = document.createElement('p');
    revealClass.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealClass.textContent = `Starship Class: ${searchedDataSpecific.result[i].properties.starship_class}`;

    //generates the close button for card reveal
    let revealClose = document.createElement('i');
    revealClose.setAttribute('class', 'material-icons right');
    revealClose.textContent = 'close'

    //appends the activator to the name on the card (and ... vertical symbol)
    starshipName.append(revealActivator)

    //appends all the text values to the reveal span
    revealSpan.append(revealClose, revealName, revealModel, revealClass, revealManufacturer, revealCost, revealLength, revealSpeed, revealCrew, revealPassengers, revealCargo, revealHyper, revealMGLT)

    //appends the span to the div wrap
    revealDiv.append(revealSpan)

    //                                                   ^^ END OF REVEAL SECTION ^^

    //appends the card to the wrap
    divWrap.append(starshipCard)
    
    //appends the mode, mglt, and hdrive to the body
    cardBody.append(starshipModel, shipMglt, shipHdrive)

    //apends the name, image, cost text, cost, body, and purchse button to the card
    document.querySelector(`.ship${i}`).append(starshipName, starshipImg, costText, starshipCost, cardBody, addCart, revealDiv)
  }

  //functionality for added an event listener to aver add card button that was generated
  cartBtn1 = document.querySelectorAll('.addCart')
    //for loop to apply to each button
    for (let i = 0; i < cartBtn1.length; i++) {
      cartBtn1[i].addEventListener('click', addCartClick1);
    }
}

//runs the searchApi function on search button click
const search = document.querySelector("#searchBtn")
search.addEventListener('click', searhApi);

//runs the searchApiFultered function on advanced search button click
const searchFiltered = document.querySelector("#filteredSearchBtn")
searchFiltered.addEventListener('click', searhApiFiltered);


//                                          vv LOCAL STORAGE FOR FILTERS SECTION vv


//local storage for hyperdrive class filter
const hyperdriveClass = document.querySelector('#rangeSliderClass')
hyperdriveClass.addEventListener("click", function(){
  hclassValue = document.querySelector('#rangeSliderClass').value
  localStorage.setItem('hclassValue',  hclassValue)
})

//local storage for hyperdrive class filter
const atmospheringSpeed = document.querySelector('#rangeSliderSpeed')
atmospheringSpeed.addEventListener("click", function(){
  speedValue = document.querySelector('#rangeSliderSpeed').value
  localStorage.setItem('speedValue',  speedValue)
})

//local storage for unavaliable starship filter
  //first local storage listener
const unavaliableNo = document.querySelector('#unavaNo')
unavaliableNo.addEventListener("click", function(){
    localStorage.setItem('unavaliableShip',  "no")
})
  //second local storage listener
const unavaliableYes = document.querySelector('#unavaYes')
unavaliableYes.addEventListener("click", function(){
    localStorage.setItem('unavaliableShip',  "yes")
})

//local storage for hide unknown speed filter
  //first local storage listener
const speedNo = document.querySelector('#speedNo')
speedNo.addEventListener("click", function(){
    localStorage.setItem('speed',  "no")
})
  //second local storage listener
const speedYes = document.querySelector('#speedYes')
speedYes.addEventListener("click", function(){
    localStorage.setItem('speed',  "yes")
})

//local storage for picture type filter
  //first local storage listener
  const GoogleApi = document.querySelector('#googleApi')
  GoogleApi.addEventListener("click", function(){
      localStorage.setItem('imageType',  "googleApi")
  })
    //second local storage listener
  const placeholders = document.querySelector('#placeholders')
  placeholders.addEventListener("click", function(){
      localStorage.setItem('imageType',  "placeholders")
  })

//local storage for support passengers filter
  //first local storage listener
const passengersNo = document.querySelector('#passengersNo')
passengersNo.addEventListener("click", function(){
    localStorage.setItem('suppotPassengers',  "no")
})
  //second local storage listener
const passengersYes = document.querySelector('#passengersYes')
passengersYes.addEventListener("click", function(){
    localStorage.setItem('suppotPassengers',  "yes")
})

//dropdown multi-selct functionality and array this was pulled from materalize
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

//clears the advance filter on page refresh
//this was decided as we want a page reset to be a hard clear of searches
localStorage.setItem('hclassValue', '4')
localStorage.setItem('speedValue', '8000')
localStorage.setItem("suppotPassengers", 'yes')
localStorage.setItem('imageType',  "googleApi")
localStorage.setItem("speed", 'yes')
localStorage.setItem("unavaliableShip", 'yes')
localStorage.setItem('priceArray', JSON.stringify([]))
localStorage.setItem("$added", 'false')
localStorage.setItem("$$added", 'false')
localStorage.setItem("$$$added", 'false')
localStorage.setItem("$$$$added", 'false')
localStorage.setItem("$$$$$added", 'false')

//price array storage for all 5 ranges cooperate here 
//*I only wrote notes in the first range as the notes would be the same for each range*
//price array storage for first range
const priceRange1 = document.querySelector('#price1')
priceRange1.addEventListener("click", function(){
  
  //checks if the price range has been added which means if the user is slicked to remove the range
  if(localStorage.getItem("$added") === 'true'){

    //sets the array to nothing
    priceArray = []
  
    //pulls the array in local storange incase there are other ranges already in there
    let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
    
    //safeguard for if there are not other ranges in the array
    if(pulledArray === null){
      pulledArray = priceArray
    }else {
      priceArray = pulledArray
    }
    
    //removes the range from the array
    priceArray = priceArray.filter(e => e !== 'range1')
    
    //relogs the array to local storage
    window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
    //marks the array as not added
    localStorage.setItem("$added", 'false')

  // else the range has not yet been added meaning the user is clicked to turn it on
  }else{

  //set the array to nothing
  priceArray = []
  
  //pulls the array from local storage incase there are other ranges already in there
  let pulledArray = JSON.parse(localStorage.getItem(`priceArray`))
  
  //safeguard for if there are not other ranges in the array
  if(pulledArray === null){
    pulledArray = priceArray
  }else {
    priceArray = pulledArray
  }
  
  // adds the selected range
  priceArray.push('range1')
  
  //relogs the array to local storage
  window.localStorage.setItem('priceArray', JSON.stringify(priceArray))
  //marks the aray as added
  localStorage.setItem("$added", 'true')
  }
})
  //price array storage for first range
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
  //price array storage for first range
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
  //price array storage for first range
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

//price array storage for first range
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


//                                       ^^ END LOCAL STORAGE FOR FILTERS SECTION ^^


//fucntion that directs the user to the chekout page when checkout putton is clicked in cart dropdown
const checkout = document.getElementById('buttonclick')
checkout.addEventListener('click' , function(){
    window.location.href = "./checkout.html" 
})

//function for generating cards based on the filtered search
async function filteredCards(){

  //generates a div wrap for the cards
  let divWrap = document.createElement('div')
  divWrap.setAttribute('id', 'divWrap')
  document.querySelector('#displayedCards').append(divWrap)

  //for loop generating cards
  loop1: for(i = 0; i < searchedData.length; i++){


//                                                                  vv START OF FILTERS vv


  //filter for unavaliable ships option
  if(localStorage.getItem('unavaliableShip') === 'no'){
    if (searchedData[i].cost_in_credits === 'unknown'){
      continue;
    }
  }

  //price filters
  let filterArray = JSON.parse(localStorage.getItem(`priceArray`))
  let costFilterVal = searchedData[i].cost_in_credits
  //price filters
  let numberVal = parseInt(costFilterVal)
  //price filters
  if(filterArray.length >= 1){
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
                      }else if(localStorage.getItem('$$$$$added') === 'false' ){
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

  //filter for hyperdrive class option
  let storedHClass = localStorage.getItem('hclassValue')
  let storedHClassInt = parseInt(storedHClass)

  if(storedHClassInt !== 4){
    console.log('0')
    console.log(storedHClassInt)

    if(storedHClassInt === 3){
      if(searchedData[i].hyperdrive_rating > 3){
        console.log('1')
        continue
      }
    }else if (storedHClassInt === 2){
      if(searchedData[i].hyperdrive_rating > 2){
      console.log('2')
      continue
      }
    }else if (storedHClassInt === 1){
      if(searchedData[i].hyperdrive_rating > 1){
      console.log('3')
      continue
      }
    }else if (storedHClassInt === 0){
        if(searchedData[i].hyperdrive_rating > 0)
        console.log('4')
        continue
      }
  }


  //filter for atmosphering speed option option
  //converts the speed of the ship to a integer and assigns it to a new variable
  let speedInterm = searchedData[i].max_atmosphering_speed
  let speedInNum = parseInt(speedInterm)

  //converts the speed of the slider to a integer and assigns it to a new variable
  let localSpeedInterum = localStorage.getItem('speedValue')
  let localSpeedNum = parseInt(localSpeedInterum)

  //compares integer of ships speed to integer of value set on slider
  if(localStorage.getItem('speedValue') !== 8000){
   if (localSpeedNum === 2000){
       localStorage.setItem('speedValue', "8000")
   }
   if(speedInNum > localSpeedNum){
     continue
   }
  }

  //filter for can show unknown speed option
  if(localStorage.getItem('speed') === 'no'){
    if (searchedData[i].max_atmosphering_speed === "0" || searchedData[i].max_atmosphering_speed === "unknown" || searchedData[i].max_atmosphering_speed === "n/a"){
        continue
    }
  }

  //filter for can support passengers option
  if(localStorage.getItem('suppotPassengers') === 'no'){
    if (searchedData[i].passengers === "0" || searchedData[i].passengers === "unknown" || searchedData[i].passengers === "n/a"){
    }else {
      continue;
    }
  }

  //filter for star ship class options
  //converts the class pulled from the api to lowercase for comparison
  dataString = searchedData[i].starship_class
  let lowerCase = dataString.toLowerCase()

  //if the class of the ship is included in the array made by selecting in the filter then..
  //..the card generates, if not, current iteration of card generating loop is skipped
  if(classArray !== undefined){
    loop2: for(let j = 0; j < classArray.length; j++){
      if(lowerCase.includes(classArray[j])){
        break
      }else if(j === classArray.length -1 ) {
        continue loop1
      }
    }
  }


//                                                                  ^^ END OF FILTERS ^^


    //generates the card
    let starshipCard = document.createElement('section')
    starshipCard.setAttribute('class', ` card center-align starship ship${i}`)

    //saftey net to run our two backup api keys when the previous one is maxed out (max is 100 searches)
    //starts by checking if image type selected by user is google image api
    if(localStorage.getItem('imageType') === 'googleApi'){
      //assigns the api fetch link to a variable
      test2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAgnhWXX_mxAWDwubyCUarTjY_Ba61uUL4&cx=21a0a191a509143c4&searchType=image&num=5&q=${searchedData[i].model}`
      
      //fetches the data and stores it in a catchall variable
      const response = await fetch(test2)
      let fetchedData = await response.json()
      console.log(fetchedData)
      imageData = fetchedData
      console.log('Sams key')

      //set a variable that finds the length of the data gather from the fetch wich should be 5 as it is pulling 5 images
      let maxxed = Object.keys(imageData).length

      //if the api key is maxed out it the object fetched is only 1 in length and the 1 is error
      //repeat process for two more keys
      if (maxxed === 1){
        backup1 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBI_Z3c7bX95-Or-Jth1eEFfXc2kuqMjfA&cx=c45afde7ad36d4a52&searchType=image&num=5&q=${searchedData[i].model}`
        const response = await fetch(backup1)
        let fetchedData = await response.json()
        console.log(fetchedData)
        imageData = fetchedData
        console.log('Willies key')
        let maxxed = Object.keys(imageData).length

        if (maxxed === 1){
          //need keanus key
          backup2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBkW2WaIkGC2twtTZJVrgNQUuDBFv5Ut90&cx=d51f763a8ffcb4269&searchType=image&num=5&q=${searchedData[i].model}`
          const response = await fetch(backup2)
          let fetchedData = await response.json()
          console.log(fetchedData)
          imageData = fetchedData
          console.log('Keanu key')
          let maxxed = Object.keys(imageData).length

          if (maxxed === 1){

            //once all 3 keys are maxed out it defaults to placeholder images
            localStorage.setItem('imageType', 'placeholders' )
          }
        }
      }
    }
  

   //generates the image 
   let starshipImg =  document.createElement('IMG')
   if(localStorage.getItem('imageType') === 'placeholders'){
     starshipImg.src = './Assets/Images/Placeholder.jpg'
   }else{
     for(let l = 0; l < imageData.items.length; l++){
       if(imageData.items[l].fileFormat === "image/"){
         continue
       }else{
         starshipImg.setAttribute('src', `${imageData.items[l].link}`)
         break
       }
   }
 }

    //sets image size and attributes
    starshipImg.setAttribute('width', '275')
    starshipImg.setAttribute('height', '150')
    starshipImg.setAttribute('class', 'imgCss')
      
    //generates the ship name
    let starshipName = document.createElement('h3')
    starshipName.setAttribute('class', 'activator')
    starshipName.textContent = `${searchedData[i].name}`

    //generates the word cost I put this here so the word "cost" sits about the actuall number
    let costText = document.createElement('h4')
    costText.textContent = `Cost:`
    
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

    // generates the hyperdrive rating text
    let shipHdrive = document.createElement('p')
    shipHdrive.textContent = `Hyperdrive Rating: ${searchedData[i].hyperdrive_rating} `

    //generates the purchase button with materalize features
    let addCart = document.createElement('button')
    addCart.setAttribute('class', `waves-effect waves-light btn addCart `)
    addCart.setAttribute('value', `${searchedData[i].cost_in_credits}`)
    addCart.setAttribute('id', `${searchedData[i].name}`)
    addCart.setAttribute('onclick', "M.toast({html: 'Added to cart!', classes: 'rounded'})")
    addCart.textContent = `Purchase`


//                                               vv  START OF CARD REVEAL SECTION vv


    //generates the activator for card reveal
    let revealActivator = document.createElement('i');
    revealActivator.setAttribute('class', 'material-icons right');
    revealActivator.textContent = "more_vert";

    //generates the div for card reveal
    let revealDiv = document.createElement('div');
    revealDiv.setAttribute('class', 'card-reveal');
    revealDiv.setAttribute("style", "background-color: #212121;");

    //generates the span for card reveal
    let revealSpan = document.createElement('span');
    revealSpan.setAttribute('class', 'card-title');
    revealSpan.setAttribute('style', 'color: white')
    revealSpan.textContent = 'Specifications'

    //generates the name value for card reveal
    let revealName = document.createElement('p');
    revealName.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealName.textContent = `Name: ${searchedData[i].name}`;

    //generates the model value for card reveal 
    let revealModel = document.createElement('p');
    revealModel.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealModel.textContent = `Model: ${searchedData[i].model}`;

    //generates the manufacturer value for card reveal
    let revealManufacturer = document.createElement('p');
    revealManufacturer.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealManufacturer.textContent = `Manufacturer: ${searchedData[i].manufacturer}`;

    //generates the cost value for card reveal
    let revealCost = document.createElement('p');
    revealCost.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCost.textContent = `Cost: ${searchedData[i].cost_in_credits}`;

    //generates the length value for card reveal
    let revealLength = document.createElement('p');
    revealLength.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealLength.textContent = `Length: ${searchedData[i].length}`;

    //generates the atmosphering speed value for card reveal
    let revealSpeed = document.createElement('p');
    revealSpeed.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealSpeed.textContent = `Atmospheric Speed: ${searchedData[i].max_atmosphering_speed}`;

    //generates the crew value for card reveal
    let revealCrew = document.createElement('p');
    revealCrew.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCrew.textContent = `Crew Size: ${searchedData[i].crew}`;

    //generates the passengers value for card reveal
    let revealPassengers = document.createElement('p');
    revealPassengers.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealPassengers.textContent = `Passengers: ${searchedData[i].passengers}`;

    //generates the cargo value for card reveal
    let revealCargo = document.createElement('p');
    revealCargo.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealCargo.textContent = `Cargo Capacity: ${searchedData[i].cargo_capacity}`;

    //generates the hyperdrive rating value for card reveal
    let revealHyper = document.createElement('p');
    revealHyper.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealHyper.textContent = `Hyperdrive Rating: ${searchedData[i].hyperdrive_rating}`;

    //generates the mglt value for card reveal
    let revealMGLT = document.createElement('p');
    revealMGLT.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealMGLT.textContent = `MGLT: ${searchedData[i].MGLT}`;

    //generates the class value for card revea
    let revealClass = document.createElement('p');
    revealClass.setAttribute('style', 'font-size: 13px; text-align: left; line-height: 15px;');
    revealClass.textContent = `Starship Class: ${searchedData[i].starship_class}`;

    //generates the close button for card reveal
    let revealClose = document.createElement('i');
    revealClose.setAttribute('class', 'material-icons right');
    revealClose.textContent = 'close'

    //appends the activator to the name on the card (and ... vertical symbol)
    starshipName.append(revealActivator)

    //appends all the text values to the reveal span
    revealSpan.append(revealClose, revealName, revealModel, revealClass, revealManufacturer, revealCost, revealLength, revealSpeed, revealCrew, revealPassengers, revealCargo, revealHyper, revealMGLT)

    //appends the span to the div wrap
    revealDiv.append(revealSpan)

    
    //                                                   ^^ END OF REVEAL SECTION ^^


    //appends the card to the wrap
    divWrap.append(starshipCard)
    
    //appends the mode, mglt, and hdrive to the body
    cardBody.append(starshipModel, shipMglt, shipHdrive)

    //apends the name, image, cost text, cost, body, and purchse button to the card
    document.querySelector(`.ship${i}`).append(starshipName, starshipImg, costText, starshipCost, cardBody, addCart, revealDiv)
  }
  //functionality for added an event listener to aver add card button that was generated
  cartBtn2 = document.querySelectorAll('.addCart')
    //for loop to apply to each button
      for (let k = 0; k < cartBtn2.length; k++) {
        
        //gives each button the ability to run the addCartClick2 function when clicked
        cartBtn2[k].addEventListener('click', addCartClick2);
      }
    
   
}    

//runs the page load function
pageload()

//page load function that includes everything we want to execute on page load (specifically the data fetch)
async function pageload(){

  //if loop to check if data has already been pulled and store in local storage
  if(JSON.parse(localStorage.getItem(`swapitech`)) === null || JSON.parse(localStorage.getItem(`swapitech`)) === undefined || JSON.parse(localStorage.getItem(`swapitech`)) === ""){
    let dataWithLink = []
    //sears the api link to a value
    userSearch = `https://swapi.tech/api/starships/?page=2&limit=36`
      
    //fetches the data and stores it to the catchall variable
    let response2 = await fetch(userSearch)
    let fetchedData2 = await response2.json()
    dataWithLink = fetchedData2
    console.log(dataWithLink)

    //the data only provides a link to the specific ship withing the api istead of the details
    //when searching the specific ship we get the details thats what this for loop is doing
    //searching each of the 36 ships and adding them to the array
    for(let i = 0; i <= 35; i++){
      userSearch = `${dataWithLink.results[i].url}`
      response2 = await fetch(userSearch)
      fetchedData2 = await response2.json()

      //stops the current iteration of the loop if the pull returns not...
      //...found **Ths is an old safteynet that im keeping as a precaution*
      if (fetchedData2.message ==='Not found'){
        continue
      }

      // pushes the properties of the data into an array
      searchedData.push(fetchedData2.result.properties)

      //puts the array with data in loca storage
      localStorage.setItem('swapitech', JSON.stringify(searchedData))

      //pulls the searched data for next loop?
      searchedData = JSON.parse(localStorage.getItem(`swapitech`))
      
    }
  } 
  //used to ensure data is present
  searchedData = JSON.parse(localStorage.getItem(`swapitech`))
  console.log(searchedData)
}

//runs the populateCart function when the cart dropdown menue is clicked
const dropdownClick = document.querySelector(".dropdown-trigger")
dropdownClick.addEventListener('click', polulateCart);

//function to populate all the items the user has added to card
let inCart = []
function polulateCart(){

  //pulls the array of items added to cart
  cartData = JSON.parse(localStorage.getItem(`cartArray`))

  //for loop for generating the cart items in the dropdown
  for(let i = 0; i < searchedData.length; i++ ){
    
    //assigns a indexed ship to a value
    nameVal = searchedData[i].name

    //for loop for comparing current indexed ship to each ship name in the cart array
    for(let j = 0; j < cartData.length; j++){
      
      //if statements to look for a match
      if(nameVal.includes(cartData[j])){
        //if statement to stop doubles
        if(inCart.includes(cartData[j])){
          continue
        }
        console.log('MatchFound')

        //generates the li
        let item = document.createElement('li')
        item.setAttribute('tabindex', '0')
        item.setAttribute('class', ' grey darken-4 cart')

        //generates the name and cost
        let itemVal = document.createElement('a')
        itemVal.setAttribute('href', '#!')
        itemVal.setAttribute('class', 'cartItem white-text')
        itemVal.setAttribute('id', `${cartData[j]}`)
        itemVal.textContent = `${cartData[j]} | ${searchedData[i].cost_in_credits} Credits`

        //appends the name and cost to the li, and appends the li to the dropdown menu
        let physicalCart = document.querySelector('.dropdown-content')
        item.append(itemVal)
        physicalCart.append(item)

        //puts the item back in the cart array that got refreshed
        inCart.push(cartData[j])

        //stores the array again to local storage
        localStorage.setItem('cartArray', JSON.stringify(inCart))
      }else{
        continue
      }
    }
  }
}

//function to add items to cart array for the searchApi function
function addCartClick1(event){
  
  // grabs the value assigned when card was generated with the ships actual value
  value = event.target.value

  //filter so the user cant add unavliable ships
  if(value === "unknown" || value === "n/a"){
    return
  }

  //pulls the cart array
  let pulledCart = JSON.parse(localStorage.getItem(`cartArray`))
 
  //gets the id from the button which was assigned the name of the ship on the card it was generated to
  idName = event.target.id

  //creates an array
  cartItems = []

  //checks if the cart array is empty
  if(pulledCart === null){
    pulledCart = cartItems
  }else {
    cartItems = pulledCart
  }

  //adds the new id (which is the ship name) to the array
  cartItems.push(idName)

  //stores the array to local storage
  localStorage.setItem('cartArray', JSON.stringify(cartItems))
}
  //these cards to the same thing and i thing i should have compined them into 1 -Sam
//function to add items to card for the searchApiFiltered function 
function addCartClick2(event){

  // grabs the value assigned when card was generated with the ships actual value
  value = event.target.value

  //filter so the user cant add unavliable ships
  if(value === "unknown" || value === "n/a"){
    return
  }

  //pulls the cart array
  let pulledCart = JSON.parse(localStorage.getItem(`cartArray`))
  
  //gets the id from the button which was assigned the name of the ship on the card it was generated to
  idName = event.target.id
  console.log(idName)

  //creates an array
  cartItems = []

  //checks if the cart array is empty
  if(pulledCart === null){
    pulledCart = cartItems
  }else {
    cartItems = pulledCart
  }

  //adds the new id (which is the ship name) to the array
  cartItems.push(idName)

//stores the array to local storage
  localStorage.setItem('cartArray', JSON.stringify(cartItems))
}

//function to clear the cart
const clearCart = document.querySelector('#clearClick')
clearCart.addEventListener("click", function(){

  //sets the cart array to nothing
  localStorage.setItem('cartArray', JSON.stringify([]))
})
