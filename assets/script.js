let allPokemon = [];
let endArr = [];

// input a pas de nom dans html donc reprendre class de form
const searchInput = document.querySelector(".researchPoke input");
const listPoke = document.querySelector(".listPoke");
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
      //   console.log(allPoke);
      allPoke.results.forEach((pokemon) => {
        fetchPokemonComplet(pokemon); // for each pokemon we execute the funct
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
      //console.log(pokeData);
      // on fetch l'img et le type depuis l'url de l'API

      objPokemonFull.pic = pokeData.sprites.front_default;
      objPokemonFull.type = pokeData.types[0].type.name;
      objPokemonFull.id = pokeData.id;

      // fetch name from other url

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then((answer) => answer.json())
        .then((pokeData) => {
          //console.log(pokeData);

          objPokemonFull.name = pokeData.names[8].name;
          allPokemon.push(objPokemonFull);

          if (allPokemon.length === 151) {
            //console.log(allPokemon);
            // sort method takes an element A and substract element B.
            // can be >, < or =. Depending on that, will be positioned before or after

            endArr = allPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);

            createCard(endArr);
          }
        });
    });
}

// CARD CREATION - création d'elements DOM

function createCard(arr) {
  for (let i = 0; 1 < arr.length; i++) {
    const card = document.createElement("li");
    let color = types[arr[i].type];
    card.style.background = color;

    const txtCard = document.createElement("h5");
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

// ANIMATION INPUT. Va déclencher event input dès qu'on write dans l'input.
// e = notre obj qui contient propriétés de l'event. Target = input, value = ce qui se trouve dans input

searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});
