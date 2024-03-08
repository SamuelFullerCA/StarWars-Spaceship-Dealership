
let planetgen;
const planets = ["Exegol", "Bracca", "Nevarro", "Dantooine", "Chandrila", "Hoth", "Morak", "Ajan Kloss"];










makeCheckoutCart()



function makeCheckoutCart(){

    let pulledData = JSON.parse(localStorage.getItem(`swapitech`))
    let pulledArray = JSON.parse(localStorage.getItem(`cartArray`))
    let tBody = document.querySelector('#cartDisplay')
    let price;
    let totalCost = 0;

    loop1: for(let i = 0; i < pulledArray.length; i++){

        let tr = document.createElement('tr')
        tr.setAttribute('id', `${pulledArray[i]}`)

        let td1 = document.createElement('td')
        td1.textContent = `${pulledArray[i]}`

        console.log(pulledArray)
        console.log(pulledData)
        
        
        for(let j = 0; j < pulledData.length; j++){
            matchCheck = pulledData[j].name
            if(matchCheck.includes(pulledArray[i])){
                
                price = pulledData[j].cost_in_credits
                

                
            }else{
                continue
            }

        }

        let td2 = document.createElement('td')
        td2.textContent = `${price}`

        let priceInt = parseInt(price)
        console.log(priceInt)
        totalCost = priceInt + totalCost


        tr.append(td1, td2)
        tBody.append(tr)

        








    }

    let tFoot = document.querySelector('#cartFooter')
        let trFoot = document.createElement('tr')

        let tdFoot = document.createElement('td')
        tdFoot.textContent = `${totalCost}`



        tFoot.append(trFoot)
        trFoot.append(tdFoot)
}






function onSubmit(event) {
//Activates modal to pop up

    event.preventDefault()
    modalInstance.open();
    }
    
    
    let modalElement = document.querySelectorAll('#modal1');
    let modalInstance;
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('hello')
        modalInstance = M.Modal.init(modalElement,)[0];
      });

    

    
    const randomPlanet = Math.floor(Math.random() * planets.length)
    



const modalDetails = document.querySelector("#submitButton")
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



