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
    toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p>${toy.likes} Likes</p>
    <button class="like-btn" data-toy-like-id="${toy.id}">Like ♥</button>
    <button class="delete-btn" data-toy-delete-id="${toy.id}">Delete</button>
    `
    document.getElementById('toy-collection').appendChild(toyDiv)
      
    const likeButton = toyDiv.querySelector('.like-btn')
    likeButton.addEventListener('click', updateToyLikes)

    const deleteButton = toyDiv.querySelector('.delete-btn')
    deleteButton.addEventListener('click', deleteToy)
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

