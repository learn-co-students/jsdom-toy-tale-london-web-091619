let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
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
  const baseURI = "http://localhost:3000/toys"

  function fetchAndysToys() {
    return fetch(baseURI)
    .then(function(response){
      return response.json()
    })
  }

  function showAndysToys() {
    fetchAndysToys()
      .then(function(toys) {
        for(let i = 0; i < toys.length; i ++) {
          showToy(toys[i])
        }
      })
  }

  function showToy(toy) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn" id="${toy.id}">Like <3</button>
    `
    document.querySelector("#toy-collection").appendChild(card)
    card.children[card.children.length - 1].addEventListener("click", increaseToyLikes)
  }

  document.querySelector(".add-toy-form").addEventListener("submit", function(e){
    e.preventDefault()
    const newToy = {
      name: e.target.children[1].value,
      image: e.target.children[3].value,
      likes: 0
    }
    createToy(newToy)
    .then(function(toy){
      showToy(toy)
    })
})

function createToy(newToy) {
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }
  return fetch(baseURI, configurationObject)
    .then(function(response){
      return response.json()
    })
}
function increaseToyLikes(e) {
  const updatedToy = {
    likes: parseInt(e.target.previousElementSibling.innerText) + 1
  }
  updateToy(updatedToy, e.target.id)
    .then(function(toy){
      e.target.previousElementSibling.innerText = toy.likes
    })
}

function updateToy(updatedToy, toyId) {
  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(updatedToy)
  }
  return fetch(`${baseURI}/${toyId}`, configurationObject)
    .then(function(response){
      return response.json()
    })
}

  showAndysToys()

})
