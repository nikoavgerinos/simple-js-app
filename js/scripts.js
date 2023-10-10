let pokemonList = [
    {name: 'Bulbasaur', 
    height: 0.7, types: ["gras", "poison"]
    },
    {name: 'Gengar', 
    height: 1.5, types: ["ghost", "poison"]
    },
    {name: 'Dragonite', 
    height: 2.2, types: ["dragon", "flight"]
    },
];

// Initialize a loop with an index variable 'i' starting at 0
for (let i = 0; i < pokemonList.length; i++) {
    // Create a <div> element with the class "pokemon-info"
    document.write('<div class="pokemon-info">');
  
    // Display the name and height of the current Pokémon
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m)");
  
    // Check if the current Pokémon is tall (height greater than 2.0)
    if (pokemonList[i].height > 2.0) {
      // Add a special message for tall Pokémon inside a <span> element
      document.write('<span class="big-pokemon"> - Wow! That\'s big!</span>');
    }
  
    // Close the <div> element
    document.write('</div><br>');
}