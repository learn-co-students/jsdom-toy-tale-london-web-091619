let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      let toySubmit = document.querySelector('input[value="Create New Toy"]')
      toySubmit.addEventListener("click", function(e){
        e.preventDefault()
        submitToy()
      })
      
    } else {
      toyForm.style.display = 'none'
    }
    
  })
  fetchAllToys()
})

function submitToy(){
  
  let name = document.querySelector("input[name=name]").value
  let image = document.querySelector("input[name=image]").value
  let formData ={
    "name": name,
    "image": image,
    "likes": 0
  }

  let configObj ={
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response){
      return response.json();
    })
    .then( function(object){
      displayNewToy(object)
    })
    .catch(function(error){
      document.body.innerHTML = error.message
    })
}

function displayNewToy(toy){
  
  const newToy = document.createElement("div")
  const toyContainer = document.querySelector("#toy-collection")
  toyContainer.appendChild(newToy)
  newToy.className = "card"

  const newh2= document.createElement("h2")
  newh2.innerText = toy.name

  const newimg =document.createElement("img")
  newimg.src = toy.image
  newimg.className = "toy-avatar"

  const newp = document.createElement("p")
  newp.innerText = `${toy.likes} likes`

  const likeButton = document.createElement("button")
  likeButton.innerText = "Like"
  likeButton.className = "like-btn"
  likeButton.addEventListener("click", function(e){
    likeToy(e)
  })

  newToy.id = toy.id
  newToy.appendChild(newh2)
  newToy.appendChild(newimg)
  newToy.appendChild(newp)
  newToy.appendChild(likeButton)
}


function displayAllToys(toys){
  for (toy of toys) {
    
    displayNewToy(toy)
  }

}


function fetchAllToys(){
  fetch('http://localhost:3000/toys')
.then(function(response) {
    return response.json();
    })
.then(function(json) {
    displayAllToys(json)
    });
}

function likeToy(e){
  let button = e.target
  let toyCard = button.parentElement
  let likes = toyCard.querySelector("p").innerText
  let newLikes = parseInt(likes) +1
  let toyId = parseInt(toyCard.id)

  let formData ={
    "likes": newLikes
  }
  

  let configObj ={
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

 
  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .catch(function(error){
      document.body.innerHTML = error.message
    })
    
    toyCard.querySelector("p").innerText = `${newLikes} likes`
}

