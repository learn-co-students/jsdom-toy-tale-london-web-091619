let addToy = false

document.addEventListener("DOMContentLoaded", () => {
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

  const toyURI = "http://localhost:3000/toys"
  const form = document.querySelector(".add-toy-form")
  renderToys()

  function getToys() {
    return fetch(toyURI)
      .then(res => res.json())
  }

  function renderToys() {
    getToys()
      .then(function(toys) {
        for (const toy of toys) {
          renderToy(toy)
        }
      })
  }

  function renderToy(toy) {
    const toyName = toy.name
    const toyPicture = toy.image
    const toyLikes = toy.likes
    const toyDiv = document.createElement("div")
    const toyList = document.querySelector("#toy-collection")
    toyDiv.classList.add("card")
    toyDiv.innerHTML = `
      <h2>${toyName}</h2>
      <img src=${toyPicture} class="toy-avatar" />
      <p>${toyLikes} Likes </p>
      <button class="like-btn" data-toy-id="${toy.id}">Like <3</button>
      <button class="delete-btn" data-toy-id="${toy.id}">Throw into the furnace.</button>
    `
    const likeButton = toyDiv.querySelector(".like-btn")
    const deleteButton = toyDiv.querySelector(".delete-btn")
    likeButton.addEventListener('click', likeToy)
    deleteButton.addEventListener('click', deleteToy)
    toyList.append(toyDiv)
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyName = document.querySelector("input[name='name']").value
    const newToyPicture = document.querySelector("input[name='image']").value
    const newToy = {
      name: newToyName,
      image: newToyPicture,
      likes: 0
    }
    createToy(newToy)
  })

  function createToy(newToy) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    }
    return fetch(toyURI, options)
      .then(res => res.json())
      .then(toy => renderToy(toy))
  }


  function likeToy(e) {
    const toyId = parseInt(e.target.dataset.toyId)
    const updateLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    const updatedToy = {
      likes: updateLikes
    }
    updateToy(updatedToy, toyId)
    .then(toy => e.target.previousElementSibling.innerText = toy.likes)
  }

  function updateToy(updatedToy, toyId) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updatedToy)
    }
    return fetch(`${toyURI}/${toyId}`, options)
      .then(res => res.json())
  }

  function deleteToy(e) {
    const toyId = parseInt(e.target.dataset.toyId)
    return fetch(`${toyURI}/${toyId}`, {method: "DELETE"})
    .then(e.target.parentElement.remove())
  }

})
