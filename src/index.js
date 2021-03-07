let addToy = false;

fetchToys()

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



function fetchToys() {
  return fetch('http://localhost:3000/toys') .then(function(response) {
    return response.json();
  }).then(function(json) {
    let allToys = json 
    allToys.forEach(element => addToys(element))
  }); 
}

function addToys(element) {
  const toyContainer = document.getElementById("toy-collection") 

  let newCard = document.createElement('div')
  newCard.className = 'card'

  let name = document.createElement('h2')
  name.innerHTML = element.name

  let img = document.createElement('img')
  img.src = element.image
  img.style.height = "200px"
  img.style.alignContent = "center"

  let likes = document.createElement('p')
  likes.innerHTML = `Likes: ${element.likes}`
  
  let likeBtn = document.createElement('button') 
  likeBtn.innerText = "Like"
  likeBtn.setAttribute('id', element.id)
  likeBtn.addEventListener("click", addLike)

  newCard.appendChild(name) 
  newCard.appendChild(img)
  newCard.appendChild(likes)
  newCard.appendChild(likeBtn)
  toyContainer.appendChild(newCard) 
}

function addLike(evt) {
  let id = evt.target.id
  let p = evt.target.previousElementSibling
  let likes = parseInt(p.innerText)
  console.log(likes)
  const reqObj = {
    method: 'PATCH', 
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }, 
    body: JSON.stringify(
      { likes : likes + 1
      })
  }

  fetch(`http://localhost:3000/toys/${id}`, reqObj)
    .then(res => res.json())
    .then(toy => {
      p.innerText = `Likes: ${likes}`
    })
}

