let addToy = false
const mainUrl = 'http://localhost:3000/toys'

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

  // get toys to be displayed on the screen, by fetching jsn data

  function fetchToys(){
    return fetch(mainUrl)
    .then(function(response){
      return response.json()
      // this returns parsed data which is being passed onto another function
    })
  }

  function renderToys(){
    fetchToys()
      .then(function(toys){
        for (let i = 0; i < toys.length; i ++){
          renderToy(toys[i])
        }
      })
  }

  function renderToy(toy){
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML =
    `<h2>${toy.name}</h2> 
    <img src=${toy.image} height='250' width='250'>
    <p>${toy.likes || 0}</p>
    <button class="like-btn" id="${toy.id}" >Like</button>`
    const toyList = document.querySelector('#toy-collection')
    toyList.appendChild(card)
    document.querySelector('[id="'+ toy.id + '"]').addEventListener('click', likeToy)
    
    // debugger
    // document.querySelector('[id="`${toy.id}`"]')
    // document.querySelector('[id="`${toy.id}`"]').addEventListener('click', likeToy)
    // add an id to button so that is associated to particular toy liked
  }
  // this function calls on fetching the data from the FetchToys funciot
  // than it gets a parsed data in an array form, and than it calls another function
  // renderToy which modifies the way data will be desplayed on the screen, and appends it
  // to an a cerain element on  the screen.

  
  // grab a form for new toy with all its atributes
  // grab the button to listen for an event, to when new toy has to be created
  
  // when all done reder it on DOM.

  const form = document.querySelector('.add-toy-form')
    form.addEventListener('submit', function(e){
      e.preventDefault()
      // call a function for fetch post request to the server with the values from the input fields
      const newToy = {
        name: document.querySelector('input[name = "name"]').value,
        image: document.querySelector('input[name = "image"]').value,
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
    return fetch(mainUrl, configurationObject)
      // return the promise after we wulled ut json out of it
      .then(function(response){
        return response.json()
      })
      // pss the promise that we get back, check is there any errors 
    // this will give the server the input object- (json been updated with new data)-but its not displayed on Dom.
  }
  // initailize button with uniw id asociated with toy
  //  the button/grab all of them, get eventlistenier on 
  // sent patch request to a server with a specific toy id
  // increase the number of likes
  
  // const likeButtons = document.querySelectorAll('.like-btn')


  function likeToy(e){
      const button = e.target
      const buttonParent = button.parentElement
      const likesEl = buttonParent.querySelector('p')
      const likes = likesEl.innerText
      const increasedLikes = parseInt(likes) + 1 

      // debugger
    const configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          
          likes: increasedLikes})
      }
    return fetch(`${mainUrl}/${parseInt(e.target.id)}`,configurationObject)
        .then(function(response){
          return response.json()
        })
        .then(function(updatedToy){
          likesEl.innerText = updatedToy.likes
          debugger
        })
    }
  
  


  renderToys()
  
  

})
