function getToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => toys.forEach(toy => injectToy(toy)))
}

function injectToy(toy) {
  const div = document.createElement("div")
  div.classList.add("card")

  const h2 = document.createElement("h2")
  h2.textContent = toy.name

  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.textContent = toy.likes + " Likes"

  const button = document.createElement("button")
  button.id = "toy" + toy.id
  button.classList.add("like-btn")
  button.textContent = "Like <3"
  button.addEventListener("click", () => {
    likeToy(toy)
      .then(() => {
        const card = document.querySelector(`#toy${toy.id}`).parentNode
        card.querySelector("p").textContent = toy.likes + " Likes"
      })
  })

  div.append(h2, img, p, button)
  document.querySelector("#toy-collection").append(div)
}

function likeToy(toy) {
  const toyUrl = `http://localhost:3000/toys/${toy.id}`
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ likes: toy.likes + 1 })
  }
  return fetch(toyUrl, configObj).then(toy.likes++)
}

function formSubmission(e) {
  e.preventDefault()
  const form = e.target
  const name = form.querySelector('input[name = "name"]').value
  const image = form.querySelector('input[name = "image"]').value

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ name: name, image: image, likes: 0 })
  }
  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(toy => injectToy(toy))

  form.reset()
  document.querySelector(".container").style.display = "none"
}

document.addEventListener("DOMContentLoaded", () => {
  let addToy = false
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container")
  toyForm.querySelector("form")
    .addEventListener("submit", e => formSubmission(e))
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = "block"
    } else {
      toyForm.style.display = "none"
    }
  })

  getToys()
})
