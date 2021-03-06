let allPokemon = [];
let endArr = [];

// input a pas de nom dans html donc reprendre class de form
const searchInput = document.querySelector(".researchPoke input");
const listPoke = document.querySelector(".listPoke");
const loading = document.querySelector(".loader");

const types = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

// API call

function fetchPokemonBase() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((answer) => answer.json())
    .then((allPoke) => {
    
      allPoke.results.forEach((pokemon) => {
        fetchPokemonComplet(pokemon);
      });
    });
}
fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
  let objPokemonFull = {};
  let url = pokemon.url;
  let nameP = pokemon.name;

  fetch(url)
    .then((answer) => answer.json())
    .then((pokeData) => {
      
      objPokemonFull.pic = pokeData.sprites.front_default;
      objPokemonFull.type = pokeData.types[0].type.name;
      objPokemonFull.id = pokeData.id;


      fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then((answer) => answer.json())
        .then((pokeData) => {
          

          objPokemonFull.name = pokeData.names[8].name;
          allPokemon.push(objPokemonFull);

          if (allPokemon.length === 151) {
           
            
            endArr = allPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);
            

            createCard(endArr);
            loading.style.display = "none";
          }
        });
    });
}

// CARD CREATION - DOM elements

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("li");
    card.setAttribute("class", "fullCard");
    let color = types[arr[i].type];
    let id = document.createElement("class");
    card.style.background = color;
    const txtCard = document.createElement("h4");
    txtCard.innerText = arr[i].name;
    const idCard = document.createElement("p");
    idCard.innerText = `ID# ${arr[i].id}`;
    const imgCard = document.createElement("img");
    imgCard.src = arr[i].pic;

    card.appendChild(imgCard);
    card.appendChild(txtCard);
    card.appendChild(idCard);

    listPoke.appendChild(card);
  }
}

// INFINITE SCROLL

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 20) {
    addPoke(6); 
  }
});

let index = 21;

function addPoke(nb) {
  if (index > 151) {
    return;
  }
  const arrToAdd = allPokemon.slice(index, index + nb);
  console.log(index, index + nb);
  createCard(arrToAdd);
  index += nb;
}

// SEARCH

searchInput.addEventListener("keyup", research);

function research() {
  if (index < 151) {
    addPoke(130);

  }

  let filter, allLi, titleValue, allTitles;
  filter = searchInput.value.toUpperCase();
  allLi = document.querySelectorAll("li");
  allTitles = document.querySelectorAll("li");

  for (i = 0; i < allLi.length; i++) {
    titleValue = allTitles[i].innerText;

    if (titleValue.toUpperCase().indexOf(filter) > -1) {
      allLi[i].style.display = "flex";
    } else {
      allLi[i].style.display = "none";
    }
  }
}

// ANIMATION INPUT. 

searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});

// OPEN CARDS

function openPopup() {
  let objPokemonFull = {};

  objPokemonFull.pic = pokeData.sprites.front_default;
  objPokemonFull.id = pokeData.id;
}
