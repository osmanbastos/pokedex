// searchPokemon.js

// Função para converter texto para snake_case
function toSnakeCase(text) {
    return text.toLowerCase().replace(/\s+/g, '_');
}

// Função para buscar Pokémon por nome
function searchPokemonByName(searchText) {
    const searchQuery = toSnakeCase(searchText);

    return pokeApi.getPokemons(0, 1118).then((pokemons = []) => {
        return pokemons.filter(pokemon => {
            const pokemonNameSnakeCase = toSnakeCase(pokemon.name);
            return pokemonNameSnakeCase.includes(searchQuery);
        });
    });
}

// Função para renderizar a lista de pokémons
function renderPokemonList(pokemons) {
    const pokemonList = document.getElementById('pokemonList');
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
}

// Função para lidar com a busca ao pressionar Enter no input
function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;

    if (searchText !== '') {
        searchPokemonByName(searchText).then(results => {
            renderPokemonList(results)
            console.log(results)
        });
    }
}
