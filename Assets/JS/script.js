
// catchall variable of data that is not locked to a function
let searchedData;


//Function that pulls an array of starships based off of user input
async function searhApi(){
  formValue = document.querySelector('#autocomplete-input').value
  userSearch = `https://swapi.dev/api/starships/?search=${formValue}`

  //fetches the data and stores it to the cathall variable
  const response = await fetch(userSearch)
  let fetchedData = await response.json()
  console.log(fetchedData)
  searchedData = fetchedData

  
  //deletes the cards generated from previous search
  const previousCards = document.querySelector('.starship')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create a card
  starshipCards()
}

//function to generate card
function starshipCards(){

let starshipCard = document.createElement('section')
//col s3 class allows it to accupy 3/12 of the row, so 4 cards per row
starshipCard.setAttribute('class', 'starship ship1 col s3')

let starshipName = document.createElement('h3')
starshipName.textContent = `${searchedData.results[0].name}`

let starshipModel = document.createElement('p')
starshipModel.textContent = `${searchedData.results[0].model}`

document.querySelector('#displayedCards').append(starshipCard)
document.querySelector('.ship1').append(starshipName, starshipModel)


// shaceship variables we can use include:
// cargo_capacity cost_in_credits crew hyperdrive_rating manufacturer name starship_class model max_atmosphering_speed passengers consumables





}


const search = document.querySelector("#searchBtn")
search.addEventListener('click', searhApi);