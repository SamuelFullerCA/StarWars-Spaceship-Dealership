//I changed some of the let to var. i know car is outdated but for some reason const and let was giving errors on the live server test
var planets = ["Exegol", "Yavin IV", "Coruscant", "Naboo", "Kamino", "Mon Calamari", "Dagobah", "Kashyyyk", "Jakku", "Dantooine", "Mustafar", "Hoth", "Geonosis", "Bespin"];

makeCheckoutCart()

//function to make the checkout cart
function makeCheckoutCart(){

    //clears the cart on page reload
    let nuke = document.querySelector('#cartWrap')
    if(nuke !== null){
        nuke.remove()
    }

    //clears the price on page reload
    let nukePrice = document.querySelector('#priceWrap')
    if(nukePrice !== null){
        nukePrice.remove()
    }

    //pulls the array of swapi data and the cart array and creates some variables for use in the function
    let pulledData = JSON.parse(localStorage.getItem(`swapitech`))
    let pulledArray = JSON.parse(localStorage.getItem(`cartArray`))
    let tBody = document.querySelector('#cartDisplay')
    let tFoot = document.querySelector('#cartFooter')
    let price;
    let totalCost = 0;

    //creates the wrap that will be removed on page refresh
    let wrap = document.createElement('div')
    wrap.setAttribute('id', 'cartWrap')
    tBody.append(wrap)

    
    let priceWrap = document.createElement('div')
    priceWrap.setAttribute('id', 'priceWrap')
    tFoot.append(priceWrap)

    //loop to generate each item in the cart to the page
    loop1: for(let i = 0; i < pulledArray.length; i++){

        //generates the tr *I'm not sure what tr or td is but its what you guys used so ill go with it - Sam*
        let tr = document.createElement('tr')
        tr.setAttribute('id', `${pulledArray[i]}`)
        

        //generates the td
        let td1 = document.createElement('td')
        td1.textContent = `${pulledArray[i]}`
        
        //for loop to find the data for the item in the cart array withing the swapi data
        for(let j = 0; j < pulledData.length; j++){
            matchCheck = pulledData[j].name

            //if a match is found
            if(matchCheck.includes(pulledArray[i])){
                
                //assign the price from that matched index to the price variable
                price = pulledData[j].cost_in_credits
            
            //if not a match continue to next iteration of the loop
            }else{
                continue
            }
        }

        //assings a creates the td for price
        let td2 = document.createElement('td')
        td2.textContent = `${price} Credits`

        // turns the price to an integer for the total
        let priceInt = parseInt(price)
        //dds the price to the total
        totalCost = priceInt + totalCost

        //appends the creaed tds and tr
        tr.append(td1, td2)
        wrap.append(tr)
    }

    //generates the value for the footer outside the loop sice its only once per page load
    let trFoot = document.createElement('tr')
    let tdFoot = document.createElement('td')
    tdFoot.textContent = `${totalCost} Credits`
    priceWrap.append(trFoot)
    trFoot.append(tdFoot)
}






function onSubmit(event) {
//Activates modal to pop up

    event.preventDefault()
    modalInstance.open();
    }
    
    
    var modalElement = document.querySelectorAll('#modal1');
    var modalInstance;
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('hello')
        modalInstance = M.Modal.init(modalElement,)[0];
      });

    

    
    var randomPlanet = Math.floor(Math.random() * planets.length)
    



var modalDetails = document.querySelector("#submitButton")
modalDetails.addEventListener('click', modalContent)



//Makes modal content
function modalContent(){

    let nuke = document.querySelector('#nukeme')
    if(nuke !== null){
        nuke.remove()
    }


    let section = document.createElement('section')
    section.setAttribute('class','card grey darken-4')
    section.setAttribute('id', 'nukeme')
    document.querySelector('#modal-Content').append(section)

    let header = document.createElement('h1')
    header.style.color = 'white'
    header.textContent = "Pickup"

    let paragraph = document.createElement('p')
    paragraph.style.fontSize = '150%'
    paragraph.style.color = 'white'
    paragraph.textContent = `Please pickup at ${planets[randomPlanet]}. Please notify us if you cannot pickup vehicle within 2 weeks of pickup time`

    document.querySelector('.card').append(header, paragraph)
    
    // if(paragraph !== null){
    //     paragraph.remove()
    // }

  
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('hello')
    modalInstance = M.Modal.init(modalElement,)[0];
});



