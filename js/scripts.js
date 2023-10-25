let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("Pokemon is not in the correct format.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function (type) {
        return type.type.name;
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

 
    let modal = document.createElement('div');
    modal.classList.add('modal');

  
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

  
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageContainer.appendChild(imageElement); 

    let textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

  
    textContainer.appendChild(titleElement);
    textContainer.appendChild(contentElement);

   
    modalContent.appendChild(imageContainer);
    modalContent.appendChild(textContainer);


    let closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.classList.add('modal-close');
    closeButton.addEventListener('click', function() {
      modalContainer.remove();
    });

  
    modal.appendChild(closeButton);
    modal.appendChild(modalContent);

   
    modalContainer.appendChild(modal);

   
    document.body.appendChild(modalContainer);

  
    window.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        modalContainer.remove();
      }
    });

 
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.contains(modalContainer)) {
        modalContainer.remove();
      }
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails 
  };
})();

pokemonRepository.loadList().then(function () {
  
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});