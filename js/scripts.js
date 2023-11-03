let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('add an object');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = $('.list-group');
    let listPokemon = $('<li class="list-group-item"></li>');

    let button = $('<button class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal"></button>');
    button.text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)); // Remove the numbering here
    listPokemon.append(button);
    pokemonList.append(listPokemon);

    button.on('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    document.getElementById('loader-element').style.display = 'block';

    return fetch(apiUrl)
      .then(response => {
        return new Promise((resolve) => setTimeout(() => resolve(response.json()), 0));
      })
      .then(json => {
        json.results.forEach(function (item, index) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          addListItem(pokemon, index); // Pass the index to addListItem
        });
        document.getElementById('loader-element').style.display = 'none';
      })
      .catch(e => {
        console.error(e);
        document.getElementById('loader-element').style.display = 'none';
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities.map(function (ability) {
          return ability.ability.name;
        });
        item.moves = details.moves.slice(0, 5).map(function (move) {
          return move.move.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name.charAt(0).toUpperCase() + item.name.slice(1) + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
    let abilitiesElement = $("<p>" + "Abilities : " + item.abilities.join(', ') + "</p>");
    let movesElement = $("<p>" + "Moves : " + item.moves.join(', ') + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
    modalBody.append(movesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  let pokemons = pokemonRepository.getAll();
  pokemons.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

  let currentPage = 1;
  const itemsPerPage = 10;

  function updatePokemonList() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const pokemonSlice = pokemonRepository.getAll().slice(start, end);

    $('.list-group').empty();
    pokemonSlice.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
    $('.container').scrollTop(0);

    if (currentPage === 1) {
      $('#previousPage').hide();
    } else {
      $('#previousPage').show();
    }
  }

  function populatePageSelect() {
    const totalPages = Math.ceil(pokemonRepository.getAll().length / itemsPerPage);
    const pageSelect = $('#pageSelect');
    pageSelect.empty();

    for (let i = 1; i <= totalPages; i++) {
      const option = $('<li></li>');
      option.text(i);
      option.val(i);
      pageSelect.append(option);
    }
    pageSelect.val(currentPage);

    pageSelect.find('li:first-child').addClass('current-page');

    $('#pageSelect').on('click', 'li', function () {
      const selectedPage = parseInt($(this).text());
      currentPage = selectedPage;
      updatePokemonList();
      $('#pageSelect li').removeClass('current-page');
      $(this).addClass('current-page');
    });
  }

  populatePageSelect();

  $('#nextPage').on('click', function (e) {
    e.preventDefault();
    const totalPages = Math.ceil(pokemonRepository.getAll().length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updatePokemonList();
      $('#pageSelect').val(currentPage);
      $('#pageSelect li').removeClass('current-page');
      $('#pageSelect li').eq(currentPage - 1).addClass('current-page');
    }
  });

  $('#previousPage').on('click', function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      updatePokemonList();
      $('#pageSelect').val(currentPage);
      $('#pageSelect li').removeClass('current-page');
      $('#pageSelect li').eq(currentPage - 1).addClass('current-page');
    }
  });

  updatePokemonList();
  $('#previousPage').hide();
});