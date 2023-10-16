let pokemonRepository = (function() {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Gengar', height: 1.5, types: ['ghost', 'poison']},
    {name: 'Dragonite', height: 2.2, types: ['dragon', 'flying']}
    // ... other Pokemon data
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      let expectedKeys = ['name', 'height', 'types'];
      let objectKeys = Object.keys(pokemon);
      let allKeysExist = expectedKeys.every((key) => objectKeys.includes(key));

      if (allKeysExist) {
        pokemonList.push(pokemon);
      } else {
        console.error("The object doesn't have the correct structure for a Pokemon entity.");
      }
    } else {
      console.error("You can only add objects to the Pokemon list.");
    }
  }

  function findByName(name) {
    return pokemonList.filter(function(pokemon) {
      return pokemon.name.toLowerCase() === name.toLowerCase();
    });
  }

  return {
    getAll: getAll,
    add: add,
    findByName: findByName
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.4, types: ["electric"] }); 


let allPokemons = pokemonRepository.getAll();


allPokemons.forEach(function(pokemon) {
  console.log(pokemon); 
});



for (let i = 0; i < allPokemons.length; i++) {
 
  document.write('<div class="pokemon-info">');


  document.write(allPokemons[i].name + " (height: " + allPokemons[i].height + "m)");


  if (allPokemons[i].height > 2.0) {

    document.write('<span class="big-pokemon"> - Wow! That\'s big!</span>');
  }


  document.write('</div><br>');
}
