document.addEventListener('DOMContentLoaded', function () {

  let addToy = false;
  const toysUrl = 'http://localhost:3000/toys';

  toysData();
  newFormDisplay();

  function fetchToys() {
    return fetch(toysUrl)
    .then(function(response) {
      return response.json()
    })
  }

  function toysData() {
    fetchToys()
    .then(function(toys) {
      singleToy(toys)
    })
  }

  function singleToy(toys) {
    for (let i = 0; i < toys.length; i++) {
      renderToys(toys[i])
    }
  }

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
    const createButton = document.querySelector('.add-toy-form')
    createButton.addEventListener('submit', newToy)
    // debugger
  }

  function renderToys(toy) {
    const toyDiv = document.createElement('div')
    toyDiv.classList.add('card')
  
    const hEl = document.createElement('h2');
    hEl.innerText = toy.name;

    const imgEl = document.createElement('img');
    imgEl.src = toy.image;
    imgEl.className = "toy-avatar";
    
    const pEl = document.createElement('p');
    pEl.innerText = `${toy.likes} Likes`;

    const likeEl = document.createElement('button');
    likeEl.className = "like-btn";
    likeEl.dataset.toyLikeId = toy.id;
    likeEl.innerText = "Like ♥"

    const delEl = document.createElement('button');
    delEl.className = "delete-btn";
    delEl.dataset.toyDeleteId = toy.id;
    delEl.innerText = "Delete";

    toyDiv.append( hEl, imgEl, pEl, likeEl, delEl)
    document.getElementById('toy-collection').appendChild(toyDiv)
      
    likeEl.addEventListener('click', updateToyLikes)

    delEl.addEventListener('click', deleteToy)
  }

  function updateToyLikes(e) {
    const toyId = e.target.dataset.toyLikeId
    const likesCount = {
      likes: parseInt(e.target.parentNode.querySelector('p').innerHTML) + 1
    }
    
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(likesCount)
    }

    return fetch(`${toysUrl}/${toyId}`, configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(toy) {
      e.target.parentNode.querySelector('p').innerHTML = `${toy.likes} Likes`
    })
  }

  function deleteToy(e) {
    const toyId = e.target.dataset.toyDeleteId
    
    const configObj = {
      method: "DELETE"
    }

    return fetch(`${toysUrl}/${toyId}`, configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(toy) {
      e.target.parentNode.remove()
    })
  }

  function newToy(e) {
    e.preventDefault()
    const addedToy = {
      name: e.target.parentNode.querySelector('input[name="name"]').value,
      image: e.target.parentNode.querySelector('input[name="image"]').value,
      likes: 0
    }
    
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(addedToy)
    }

    return fetch(toysUrl, configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(toy) {
      renderToys(toy)
    })
  }

})

