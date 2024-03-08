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

// checkout()
function onSubmit (event){
event.preventDefault()
if  (isValid()){
    document.querySelector("#submitButton").setAttribute('class', 'modal-trigger')
    console.log('Hello')
    
}else {
document.querySelector("#submitButton").removeAttribute('class', 'modal-trigger')
}
}
function isValid (){
    return(document.querySelector('#name').value !== "" &&
document.querySelector('#email').value !== "" &&
document.querySelector('#address').value !== "" &&
document.querySelector('#city').value !== "" &&
document.querySelector('#zip').value !== "")
}
