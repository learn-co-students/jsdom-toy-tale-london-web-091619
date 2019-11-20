let addToy = false;

//   //first attempt, all functions are working! 

// document.addEventListener("DOMContentLoaded", ()=>{
//   const addBtn = document.querySelector('#new-toy-btn')
//   const toyForm = document.querySelector('.container')
//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })

//   const baseURI = "http://localhost:3000/toys"

//   //fetch all the toys from the database 
//   function fetchToys(){
//     return fetch(baseURI)
//     .then(function(response){
//       return response.json()
//     })
//   }

//   //iterate through all of the toys and render each one
//   function renderToys(){
//     fetchToys()
//     .then(function(toys){
//       for (let i = 0; i < toys.length; i++){
//         renderToy(toys[i])
//       }
//     })
//   }

//   function renderToy(toy) {
//     //create a div with a class called card
//     const card = document.createElement("div")
//     card.classList.add("card")
//     //add h2 tag that contains the toy's name, an img with an src of the toy's image and a class of toy-avatar
//     //then a p tag that contains the number of likes a toy has, and create a button containing a class of like-btn and an id of that toy's id
//     card.innerHTML = `
//     <h2>${toy.name}</h2>
//     <img src="${toy.image}" class="toy-avatar">
//     <p>${toy.likes}</p>
//     <button class="like-btn" id="${toy.id}"> Like <3 </button>
//     `
//     //append the new card div to the toy-collection div
//     document.querySelector("#toy-collection").appendChild(card)
//     //add a click event to the like button so that users can increase that toys likes by one
//     card.children[card.children.length - 1].addEventListener("click", increaseLikes)
//   }

//   //create a function for the submit the create toy form
//   document.querySelector(".add-toy-form").addEventListener('submit', function(e){
//     //Prevent the form's default behaviour so that it doesn't submit a POST request and refresh the page
//     e.preventDefault()
//     //Create a new toy object with the name and image the user typed into the form
//     const newToy = {
//       name: e.target.children[1].value,
//       image: e.target.children[3].value,
//       likes: 0
//     }
//     //Tell the server to create a new toy with the info from the form
//     createToy(newToy)
//       //when the server responds with the newly created toy, create a new div for it and add it to the DOM
//       .then(function(toy){
//         renderToy(toy)
//       })
//   })

//   //Create a configuration object with the method and headers and the newly created toy ad the body
//   function createToy(newToy){
//     const configObject = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(newToy)
//     }
//     return fetch(baseURI, configObject)
//     .then(function(response){
//       return response.json()
//     })
//   }

//   //
//   function increaseLikes(e){
//     //create the body of the request by accessing the liked toy's current likes and increase them by one
//     const updatedToy = {
//       likes: parseInt(e.target.previousElementSibling.innerText) + 1
//     }
//     //Pass updatedToy the body of the request and the id of the toywe want to update so that we can create the correct URL
//     updateToy(updatedToy, e.target.id)
//     //When the server responds with the updated toy, find the div for that toy and update its likes to be the newly increased like count of the updated toy
//     .then(function(toy){
//       e.target.previousElementSibling.innerText = toy.likes
//     })
//   }

//   //create the updatedtoy function to tell the server the user has liked a toy so the toy's likes needs to be updated
//   function updateToy(updatedToy, toyId){
//     const configObject = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(updatedToy)
//     }
//     return fetch(`${baseURI}/${toyId}`, configObject)
//     .then(function(response){
//       return response.json()
//     })
//   }


//     renderToys()
//   })


  //second attempt all functions are working! 

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

  const baseURL = 'http://localhost:3000/toys'

  function init(){
    renderToys();
    submitForm();
  }

  //1 - start by fetching all the toy objects with the responding data.
  function fetchToys(){
    return fetch(baseURL)
    .then( resp => resp.json())
  }

  //2 - then for each toy make a div with the className = card. And iterate through each toy.
  function renderToys(){
    fetchToys()
    .then(function(toys){
      for (let i = 0; i < toys.length; i++){
        toyInfo(toys[i])
      }
    })
  }

  //3 - each card has the following child elements: h2/toy name, img/src toy-avatar, p/likes, button/like-btn
  function toyInfo(toy){
    const card = document.createElement('div')
    card.classList.add("card")
    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    let image = document.createElement('img')
    image.src = toy.image
    image.classList.add("toy-avatar")
    let p = document.createElement('p')
    p.innerHTML = toy.likes
    let button = document.createElement('button')
    button.innerText = "Like <3"
    button.classList.add("like-btn")
    button.id = toy.id
    //add an id to the button
    button.addEventListener('click', increaseLikes)

    const collection = document.querySelector('#toy-collection')
    collection.append(card)
    card.append(h2, image, p, button)
  }

  //4 - Add a new Toy! Get the form input values that the user enters then send a POST request to the baseURL 
  function submitForm(){
    let form = document.querySelector('.add-toy-form')
    form.addEventListener('submit', function(e){
      e.preventDefault()
      let newToy = {
        name: e.target.children[1].value,
        image: e.target.children[3].value,
        likes: 0
      }
      createToy(newToy)
      .then(function(toy){
        toyInfo(toy)
      })
    })
  }

  function createToy(newToy){
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    }
    return fetch(baseURL, configObject)
    .then(resp => resp.json())
  }


  //5 - Update likes! send a PATCH request to the baseURL and increase the toy's likes.
  function increaseLikes(e){
    const updateLikes = {
      likes: parseInt(e.target.previousElementSibling.innerText) + 1
    }
    updateToy(updateLikes, e.target.id)
    .then(function(toy){
      e.target.previousElementSibling.innerText = toy.likes
    })
  }

  function updateToy(updateLikes, toyId){
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updateLikes)
    }
    return fetch(`${baseURL}/${toyId}`, configObject) 
    .then( resp => resp.json())
  }


  init();
})