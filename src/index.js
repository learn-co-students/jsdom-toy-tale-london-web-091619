let addToy = false
const toysUrl = 'http://localhost:3000/toys'
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const newToyForm = document.querySelector('.add-toy-form')
  getToys()
  // postToys()
  
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
 


  function getToys(){
    return fetch(toysUrl)
    .then(resp => resp.json())
    .then(toys => renderToys(toys))
  }
  
  function renderToys(toys){
    toys.forEach(function(toy){
      renderToy(toy)

    

    })
  


  }

  function renderToy(toy){
   let toyCollection = document.querySelector('#toy-collection')
   let newDiv = document.createElement('div')
   newDiv.className = 'card'
   
   let toyName = document.createElement('h2')
    toyName.textContent = toy.name

    let toyImg = document.createElement('img')
     toyImg.src = toy.image
     toyImg.className = 'toy-avatar'

   let toyLikes = document.createElement('p')
     toyLikes.innerHTML = toy.likes 
  

    let toyLikeButton = document.createElement('button')
     toyLikeButton.innerHTML = "Like"
     toyLikeButton.className = 'like-btn'
     toyLikeButton.id = toy.id   //set the button id 

 


   toyCollection.append(newDiv)
   newDiv.append(toyName,toyImg,toyLikes,toyLikeButton)

   document.querySelector(`button[id= "${toy.id}"]`).addEventListener('click', likeToy)

  }

    function likeToy(e){
        
        let toyLikesStr = e.target.parentElement.querySelector("p").innerText
        let toyLikesInt = parseInt(toyLikesStr)
      // debugger
       let configurationObject ={
         method: 'PATCH',
         headers: {
           "Content-Type": 'application/json',
           "Accept": "application/json"
         },
         body: JSON.stringify({
           "likes": toyLikesInt + 1
         })
       }
        fetch(`http://localhost:3000/toys/${e.target.id}`, configurationObject)
        .then(function(resp){
        resp.json()
        })
        .then(function(toy){
          e.target.parentElement.querySelector("p").innerText = toyLikesInt + 1 
        })


    }
 /// add new a new toy and persist to the server with fetch 

    newToyForm.addEventListener('submit', function(e){
      e.preventDefault()
      let toyData = { 
        "name": newToyForm.name.value,
        "image":newToyForm.image.value,
        "likes": 0
     
     }
      postToys(toyData)
      .then(function(toy){
        renderToy(toy)

      })

    })

    function postToys(toyData){

      
      

      let configurationObject = { 
        method : "POST",
        headers: { 
          "Content-Type": "application/json",
           "Accept": "application/json"
        },
        
        body:JSON.stringify(toyData)
  
      }
        

     return fetch(toysUrl, configurationObject)
      .then(function(response){
        return response.json()
      })
    }
    
   

})
