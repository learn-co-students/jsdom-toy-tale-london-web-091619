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
  // const patchURI = "http://localhost:3000/toys/"
  const showToy = document.querySelector("#toy-collection")

  function initialise() {
    fetchAndysToys()
    document.querySelector(".submit").addEventListener("click", addNewToy)
  }

  function fetchAndysToys(toys) {
    fetch(baseURI)
    .then(toys => toys.json())
    .then(toys => sortToys(toys))
  }

  function sortToys(toys) {
    for(let i = 0; i < toys.length; i ++)
    showAndysToys(toys[i])
  }

  function showAndysToys(toy) {
    toyShower = document.createElement("div")
    toyShower.id = toy.id
    toyShower.classList.add("card")
    toyName = document.createElement("h2")
    toyName.textContent = toy.name
    toyImage = document.createElement("img")
    toyImage.classList.add("toy-avatar")
    toyImage.src = toy.image
    toyLikes = document.createElement("p")
    toyLikes.textContent = toy.likes
    likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.dataset.id = toy.id
    likeButton.innerText = "Like <3"
    likeButton.addEventListener("click", increaseLikes)
    deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-btn")
    deleteButton.innerText = "Give Toy to Sid"
    deleteButton.dataset.id = toy.id
    deleteButton.addEventListener("click", deleteToy)

    toyShower.append(toyName, toyImage, toyLikes, likeButton, deleteButton)
    showToy.append(toyShower)
    console.log(toy)
  }

  function addNewToy(e) {
    e.preventDefault()

    const createToy = {
      name : document.querySelector('input[name= "name"]').value ,
      image : document.querySelector(`input[name= "image"]`).value ,
      likes : 0
      }
      
      const configObject = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(createToy)
    }
    return fetch(baseURI, configObject)
    .then( res => res.json())
    .then(toy => showAndysToys(toy))
  }

  function increaseLikes(e) {
    toyId = e.target.dataset.id
    likes = { likes : parseInt(e.target.previousSibling.innerText) + 1 }
    newLike(likes, toyId, e)
  }

  function newLike(likes, toyId, e) {
    const likeIncreaser = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(likes)
    }
    return fetch(baseURI + "/" + `${toyId}`, likeIncreaser)
    .then( res => res.json())
    .then( toy => likedToy(toy, e))
  }

  function likedToy(toy, e) {
    e.target.previousSibling.innerText = toy.likes
    // const card = document.querySelector(`div #${toy.id}`)
    // debugger
  }

  function deleteToy(e) {
    toyId = e.target.dataset.id
    // debugger
    return fetch(baseURI + "/" + `${toyId}`, {"method":"DELETE"})
    .then(e.target.parentElement.remove())
    }

    initialise()
})