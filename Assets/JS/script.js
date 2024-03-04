
// catchall variable of data that is not locked to a function
let searchedData;
let imageData;


//Function that pulls an array of starships based off of user input
async function searhApi(){

  formValue = document.querySelector('#autocomplete-input').value
  //quick test for google image api
  test2 = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD3Lznxmq6WeZS28GXXXD3JQE5_m1PCatU&cx=21a0a191a509143c4&searchType=image&q=${formValue}`

  const response = await fetch(test2)
  let fetchedData = await response.json()
  console.log(fetchedData)
  imageData = fetchedData



  userSearch = `https://swapi.dev/api/starships/?search=${formValue}`

  //fetches the data and stores it to the cathall variable
  const response2 = await fetch(userSearch)
  let fetchedData2 = await response2.json()
  console.log(fetchedData2)
  searchedData = fetchedData2

  
  //deletes the cards generated from previous search
  const previousCards = document.querySelector('.starship')
  if (previousCards !== null){
    previousCards.remove()
  }

  //runs the function to create a card
  starshipCards()


//function to generate card
function starshipCards(){

let starshipCard = document.createElement('section')
//col s3 class allows it to accupy 3/12 of the row, so 4 cards per row
starshipCard.setAttribute('class', 'starship ship1 col s3')

let starshipImg = document.createElement('IMG')
starshipImg.setAttribute('src', `${imageData.items[0].link}`)
starshipImg.setAttribute('width', '300')
starshipImg.setAttribute('height', '300')
starshipImg.setAttribute('class', 'imgCss')


let starshipName = document.createElement('h3')
starshipName.textContent = `${searchedData.results[0].name}`

let starshipModel = document.createElement('p')
starshipModel.textContent = `${searchedData.results[0].model}`

let addCart = document.createElement('button')
addCart.setAttribute('id', `${searchedData.results[0].name}`)


document.querySelector('#displayedCards').append(starshipCard)
document.querySelector('.ship1').append(starshipName, starshipModel, starshipImg, addCart)


// shaceship variables we can use include:
// cargo_capacity cost_in_credits crew hyperdrive_rating manufacturer name starship_class model max_atmosphering_speed passengers consumables





}
}


const search = document.querySelector("#searchBtn")
search.addEventListener('click', searhApi);


// async function googleimageApi(){

//   test = 'https://cse.google.com/cse.js?cx=92c28db4b1c7148d3'
//   test2 = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD3Lznxmq6WeZS28GXXXD3JQE5_m1PCatU&cx=21a0a191a509143c4&searchType=image&q=deathstar'

//   const response = await fetch(test2)
//   let fetchedData = await response.json()
//   imageData = fetchedData

//   console.log(fetchedData)
// }


