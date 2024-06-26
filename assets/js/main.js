const pokemonList = document.getElementById('pokemonList');
const limitInput = document.getElementById('limitInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let offset = 0;
let limit = 12; // Define how many pokemons to show per page

// Função para renderizar a lista de pesquisa de pokémons por nome
function renderSearchList(pokemons) {
    const pokemonList = document.getElementById('pokemonList');
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
    addEventListenersToPokemonList();
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}" onclick="showPokemonDetails(${pokemon.number})">
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

function showPokemonDetails(pokemonNumber) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    const pokemon = pokeApi.getPokemonDetailByNumber(pokemonNumber);

    pokemon.then(details => {
        const detailsHtml = `
            <h2>${details.name}</h2>
            <p>Number: #${details.number}</p>
            <img src="${details.photo}" alt="${details.name}">
            <p>Types: ${details.types.join(', ')}</p>
        `;
        pokemonDetailsContainer.innerHTML = detailsHtml;
        pokemonDetailsContainer.style.display = 'block'; // Exibir o contêiner de detalhes
        searchContainer.style.display = 'none'; // Ocultar o contêiner de pesquisa
    });
}

function changeLimit() {
    limit = parseInt(limitInput.value);
    renderPokemonList();
}
// Event listener para buscar ao pressionar Enter no input
document.getElementById('limitInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        changeLimit();
    }
});

function renderPokemonList() {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
        addEventListenersToPokemonList();
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

//searchPokemon
// Função para converter texto para snake_case
function toSnakeCase(text) {
    return text.toLowerCase().replace(/\s+/g, '_');
}

// Função para buscar Pokémon por nome
function searchPokemonByName(searchText) {
    const searchQuery = toSnakeCase(searchText);

    return pokeApi.getPokemons(0, 1118).then((pokemons) => {
        return pokemons.filter(pokemon => {
            const pokemonNameSnakeCase = toSnakeCase(pokemon.name);
            return pokemonNameSnakeCase.includes(searchQuery);
        });
    });
}



// Função para lidar com a busca ao pressionar o botão search
function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;

    if (searchText !== '') {
        searchPokemonByName(searchText).then(results => {
            renderPokemonList(results)
            addEventListenersToPokemonList();
        });
    } else {
        window.onload = renderPokemonList();
    }
}

// Função redundante para confirmar o carregamento da página
function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;

    if (searchText !== '') {
        searchPokemonByName(searchText).then(results => {
            renderSearchList(results)
            addEventListenersToPokemonList();
        });
    } else {
        window.onload = renderPokemonList();
    }
}
// Event listener para buscar ao pressionar Enter no input
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSearchInput();
    }
});

function addEventListenersToPokemonList() {
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
            const number = pokemon.getAttribute('data-number');
            showPokemonDetails(number);
        });
    });
}