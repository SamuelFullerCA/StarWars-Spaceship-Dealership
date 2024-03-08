
let planetGen;
const planets = ["Exegol", "Bracca", "Nevarro", "Dantooine", "Chandrila", "Hoth", "Morak", "Ajan Kloss"];
//Activates modal to pop up
function onSubmit (event){
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

