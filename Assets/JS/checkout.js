// function checkout() {
// const card = document.createElement('div');
// card.setAttribute('class','cards')
// document.getElementID('checkout').appendChild(card)

// // Create h2 element for title
// const title = document.createElement('h2');
// title.textContent = 'Title';


// // Create p element for description
// const description = document.createElement('p');
// description.textContent = 'Description';


// // Append title and description to the card


// // Append the card to the body or any other container
// document.querySelector('.cards').appendChild(title, description);



makeCheckoutCart()


function makeCheckoutCart(){

    let pulledData = JSON.parse(localStorage.getItem(`swapitech`))
    let pulledArray = JSON.parse(localStorage.getItem(`cartArray`))
    let tBody = document.querySelector('#cartDisplay')

    let tr = document.createElement('tr')
    tr.setAttribute('id', `${pulledArray[0]}`)

    let td1 = document.createElement('td')
    td1.textContent = `${pulledArray[0]}`

    let td2 = document.createElement('td')
    td2.textContent = `${pulledData[0].cost_in_credits}`

    tr.append(td1, td2)
    tBody.append(tr)



    
}






function onSubmit(event) {
    event.preventDefault()
    modalInstance.open();
}

let modalElement = document.querySelectorAll('#modal1');
let modalInstance;

document.addEventListener('DOMContentLoaded', function () {
    console.log('hello')
    modalInstance = M.Modal.init(modalElement,)[0];
});

// checkout()
// function onSubmit(event) {
//     event.preventDefault()
//     if (isValid()) {
//         document.querySelector("#submitButton").setAttribute('class', 'modal-trigger')
//         // document.getElementById("modal1").style.display = "block"

//     } else {
//         document.querySelector("#submitButton").removeAttribute('class', 'modal-trigger')
//         console.log('fsfsfsf')
//     }
// }

// function isValid() {
//     return (document.querySelector('#name').value !== "" &&
//         document.querySelector('#email').value !== "" &&
//         document.querySelector('#address').value !== "" &&
//         document.querySelector('#city').value !== "" &&
//         document.querySelector('#zip').value !== "")
// }


