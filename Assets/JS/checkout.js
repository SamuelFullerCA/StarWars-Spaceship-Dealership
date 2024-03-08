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


