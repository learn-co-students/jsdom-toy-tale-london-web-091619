let addToy = false;
let baseURI = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  document.querySelector(".submit").addEventListener("click", function (e) {
    e.preventDefault()
    createNewToy()
  })

  fetch(baseURI)
    .then(r => r.json())
    .then(toys => cardify(toys))

  function cardify(toys) {
    toys.forEach(toy => createCard(toy))
  }

  function createCard(toy) {
    const toyDiv = document.querySelector("#toy-collection");
    const newChar = document.createElement("div");
    newChar.classList.add("card");
    newChar.innerHTML = ` 
        <h2>${toy.name}</h2>
        <img src = ${toy.image} class="toy-avatar">
        <p>${toy.likes}</p>`;

    const likeButton = document.createElement('button')
    likeButton.innerText = "Like <3"
    likeButton.dataset.id = toy.id
    likeButton.addEventListener("click", function (e) {
      likeToy(e)
    })

    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Forcibly remove toy"
    deleteButton.dataset.id = toy.id
    deleteButton.addEventListener("click", function (e) {
      deleteToy(e)
    })

    newChar.append(likeButton, deleteButton)
    toyDiv.append(newChar);
  }

  function likeToy(e) {
    const toyId = e.target.dataset.id
    let likeEl = e.target.previousSibling
    const newLikes = parseInt(likeEl.innerText) + 1

    const updates = {
      likes: newLikes
    }

    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updates)
    }

    fetch(baseURI + `/${toyId}`, configObject)
      .then(r => r.json())

    likeEl.innerText = newLikes
  }

  function createNewToy() {
    const name = document.querySelector("input[name=name]").value
    const image = document.querySelector("input[name=image]").value

    const updates = {
      "name": name,
      "image": image,
      "likes": 0
    }

    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updates)
    }

    fetch(baseURI, configObject)
      .then(r => r.json())
      .then(function (toy) {
        createCard(toy)
      })

  }

  function deleteToy(e) {
    const toyId = e.target.dataset.id
    fetch(baseURI + `/${toyId}`, { method: "DELETE" })
    e.target.parentElement.remove()
  }




});


