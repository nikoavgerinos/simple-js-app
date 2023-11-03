let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.error("add an object");
  }
  function n() {
    return e;
  }
  function o(e) {
    let t = $(".list-group"),
      n = $('<li class="list-group-item"></li>'),
      o = $(
        '<button class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal"></button>'
      );
    o.text(e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      n.append(o),
      t.append(n),
      o.on("click", function () {
        l(e);
      });
  }
  function i(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.abilities = t.abilities.map(function (e) {
            return e.ability.name;
          })),
          (e.moves = t.moves.slice(0, 5).map(function (e) {
            return e.move.name;
          }));
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function l(e) {
    i(e).then(function () {
      !(function e(t) {
        let n = $(".modal-body"),
          o = $(".modal-title");
        o.empty(), n.empty();
        let i = $(
            "<h1>" + t.name.charAt(0).toUpperCase() + t.name.slice(1) + "</h1>"
          ),
          l = $('<img class="modal-img" style="width:50%">');
        l.attr("src", t.imageUrl);
        let a = $("<p>Height : " + t.height + "</p>"),
          p = $("<p>Weight : " + t.weight + "</p>"),
          r = $("<p>Abilities : " + t.abilities.join(", ") + "</p>"),
          s = $("<p>Moves : " + t.moves.join(", ") + "</p>");
        o.append(i),
          n.append(l),
          n.append(a),
          n.append(p),
          n.append(r),
          n.append(s);
      })(e);
    });
  }
  return {
    add: t,
    getAll: n,
    addListItem: o,
    loadList: function e() {
      let n = document.getElementById("loader-element");
      return (
        (n.style.display = "block"),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then((e) => new Promise((t) => setTimeout(() => t(e.json()), 0)))
          .then((e) => {
            e.results.forEach(function (e, n) {
              let i = { name: e.name, detailsUrl: e.url };
              t(i), o(i, n);
            }),
              (n.style.display = "none");
          })
          .catch((e) => {
            console.error(e), (n.style.display = "none");
          })
      );
    },
    loadDetails: i,
    showDetails: l,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
  let e = 1;
  function t() {
    let t = (e - 1) * 10,
      n = 10 * e,
      o = pokemonRepository.getAll().slice(t, n);
    $(".list-group").empty(),
      o.forEach(function (e) {
        pokemonRepository.addListItem(e);
      }),
      $(".container").scrollTop(0),
      1 === e ? $("#previousPage").hide() : $("#previousPage").show();
  }
  !(function n() {
    let o = Math.ceil(pokemonRepository.getAll().length / 10),
      i = $("#pageSelect");
    i.empty();
    for (let l = 1; l <= o; l++) {
      let a = $("<li></li>");
      a.text(l), a.val(l), i.append(a);
    }
    i.val(e),
      i.find("li:first-child").addClass("current-page"),
      $("#pageSelect").on("click", "li", function () {
        let n = parseInt($(this).text());
        (e = n),
          t(),
          $("#pageSelect li").removeClass("current-page"),
          $(this).addClass("current-page");
      });
  })(),
    $("#nextPage").on("click", function (n) {
      n.preventDefault();
      let o = Math.ceil(pokemonRepository.getAll().length / 10);
      e < o &&
        (e++,
        t(),
        $("#pageSelect").val(e),
        $("#pageSelect li").removeClass("current-page"),
        $("#pageSelect li")
          .eq(e - 1)
          .addClass("current-page"));
    }),
    $("#previousPage").on("click", function (n) {
      n.preventDefault(),
        e > 1 &&
          (e--,
          t(),
          $("#pageSelect").val(e),
          $("#pageSelect li").removeClass("current-page"),
          $("#pageSelect li")
            .eq(e - 1)
            .addClass("current-page"));
    }),
    t(),
    $("#previousPage").hide();
});
