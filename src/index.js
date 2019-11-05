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

function fetchtoys(){
  return fetch(baseURI)
   .then(res => res.json())
}

function renderToys(){
  fetchtoys()
  .then(function(toys){
    for(let i = 0; i < toys.length; i++){
      renderToy(toys[i])
    }
  })
}

function renderToy(toy){
  const card = document.createElement("div")
  card.classList.add("card")
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar">
  <p>${toy.likes}</p>
  <button class="like-btn" id="${toy.id}">Like <3</button>
  `
  document.querySelector("#toy-collection").appendChild(card)
  card.children[card.children.length - 1].addEventListener('click', increaseToyLikes)
}

document.querySelector(".add-toy-form").addEventListener("submit", function(e){
  e.preventDefault()
  const toyName = document.querySelector("input[name='name']").value
  const toyImage = document.querySelector("input[name='image']").value
  const newToy = {
    name: toyName,
    image: toyImage,
    likes: 0
  }
  createToy(newToy)
  .then(function(toy){
    renderToy(toy)
  })
})

function createToy(newToy){
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }
  return fetch(baseURI,configurationObject)
  .then(res => res.json())
}

function increaseToyLikes(e) {
  // Create the body of the request by accessing the liked toy's current likes and increasing them by one
  const updatedToy = {
    likes: parseInt(e.target.previousElementSibling.innerText) + 1
  }
  // Pass updateToy the body of the request and the id of the toy we want to update so that we can create the correct URL
  updateToy(updatedToy, e.target.id)
    // When the server responds with the updated toy, find the div for that toy and update its likes to be the newly increased like count of the updated toy
    .then(function(toy){
      e.target.previousElementSibling.innerText = toy.likes
    })
}

function updateToy(updatedToy,toyId){
  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(updatedToy)
  }
  return fetch(`${baseURI}/${toyId}`, configurationObject)
  .then(res => res.json())
}

renderToys()
})


//   return fetch("http://localhost:3000/toys")
//         .then(res => res.json())
//         .then(function(toys){
//           for(const toy of toys){
//             const toyColl = document.getElementById('toy-collection')
//             let cardDiv = document.createElement("div")
//             let toyName = document.createElement("h2")
//             let toyImage = document.createElement("img")
//             let toyLikes = document.createElement("p")
//             let likeButton = document.createElement("button")
//
//             cardDiv.className = "card"
//             toyLikes.textContent = !toy.likes ? 0 + " likes" : `${toy.likes} likes`
//             toyName.textContent = toy.name
//             toyImage.src = toy.image
//             toyImage.className = "toy-avatar"
//             likeButton.className = "like-btn"
//             likeButton.textContent = "Like <3"
//
//
//             toyColl.appendChild(cardDiv);
//             cardDiv.appendChild(toyName);
//             cardDiv.appendChild(toyImage)
//             cardDiv.appendChild(toyLikes)
//             cardDiv.appendChild(likeButton)
//           }
//         })
// })
//
// function submitToy(name,image){
//   return fetch("http://localhost:3000/toys",{
//     method:"POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       "name": name,
//       "image": image,
//       "likes": 0
//     })
//   })
// }
