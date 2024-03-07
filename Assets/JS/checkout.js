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