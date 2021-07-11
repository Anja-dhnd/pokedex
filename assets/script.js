let allPokemon = [];
let endArr = [];

// input a pas de nom dans html donc reprendre class de form
const searchInput = document.querySelector(".researchPoke input");

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
      console.log(pokeData);
    });
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
