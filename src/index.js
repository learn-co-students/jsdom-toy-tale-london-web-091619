let addToy = false;
const toysUri = 'http://localhost:3000/toys';
const toyUri = 'http://localhost:3000/toys/:id';
const addButton = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.add-toy-form');


document.addEventListener("DOMContentLoaded", ()=>{
  newFormDisplay();
  jsonFetch();
  jsonData();
  newToys();
  likeToy();
})

function newFormDisplay() {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
}

function jsonFetch() {
  return fetch(toysUri)
  .then(function(response) {
    return response.json();
  })
}

function jsonData() {
  jsonFetch()
  .then(function(toys) {
    for (i = 0; i < toys.length; i++) {
      createToyElement(toys[i]);
    }
  })
}

function createToyElement(toy) {
  const toyCard = document.createElement('div');
  toyCard.classList.add('card');
  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ♥</button>
  `;
  const toyDisplay = document.getElementById('toy-collection');
  toyDisplay.appendChild(toyCard)
}

function newToys() {
  toyForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const newToy = {
      name: document.querySelector('input[name="name"]').value,
      image: document.querySelector('input[name="image"]').value,
      likes: 0
    }
    createToys(newToy)
    .then(function(toy) {
      createToyElement(toy)
    })
  })
}

function createToys(newToy) {
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }
  return fetch(toysUri, configObject)
  .then(function(response){
    return response.json()
  })
}

function likeToy() {
  document.addEventListener('click', function(e) {
    const likeNumber = e.target.parentNode.querySelector('p').innerHTML; 
    let likeInteger = parseInt(likeNumber);
    likeInteger++;
    e.target.parentNode.querySelector('p').innerHTML = `${likeInteger} Likes`;
  })
}











