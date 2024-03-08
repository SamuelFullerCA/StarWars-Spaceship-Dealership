function checkout() {
const card = document.createElement('div');
card.setAttribute('class','cards')
document.getElementID('checkout').appendChild(card)

// Create h2 element for title
const title = document.createElement('h2');
title.textContent = 'Title';


// Create p element for description
const description = document.createElement('p');
description.textContent = 'Description';


// Append title and description to the card


// Append the card to the body or any other container
document.querySelector('.cards').appendChild(title, description);

checkout()
}
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






