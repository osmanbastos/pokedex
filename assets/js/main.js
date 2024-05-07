const pokemonList = document.getElementById('pokemonList');
const limitInput = document.getElementById('limitInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let offset = 0;
let limit = 12; // Define how many pokemons to show per page

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <h2 class="name">${pokemon.name}</h2>
            <p class="number">#${pokemon.number}</p>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img class="image" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function changeLimit() {
    limit = parseInt(limitInput.value);
    renderPokemonList();
}

function renderPokemonList() {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    });
}

function nextPage() {
    offset += limit;
    renderPokemonList();
}

function prevPage() {
    offset = Math.max(0, offset - limit);
    renderPokemonList();
}

// Initial render
renderPokemonList();
