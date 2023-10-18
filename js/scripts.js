let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
    { name: 'Gengar', height: 1.5, types: ['ghost', 'poison'] },
    { name: 'Dragonite', height: 2.2, types: ['dragon', 'flying'] }
    // ... other Pokemon data
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("pokemon is not correct format");
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // Adding the event listener for the button
    addEventListenerToButton(button, pokemon);
  }

  // Creating a new function to handle the event listener addition
  function addEventListenerToButton(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Updated showDetails function to just log the pokemon object
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

// Adding a new Pokémon to demonstrate functionality
pokemonRepository.add({ name: 'Pikachu', height: 0.4, types: ['electric'] });

// Iterating over each Pokémon in the repository and creating a list item for each
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
