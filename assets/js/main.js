let offset = 0;
let limit = 12; // Define o número de Pokemons a serem exibidos por página
function changeLimit() {
    const limitInput = document.getElementById('limitInput');
    limit = parseInt(limitInput.value);
    renderPokemonList();
}
let imageOffset = (offset + 1); // Declara a variável imageOffset e inicializa com o valor de offset + 1

async function fetchPokemon(offset) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        alert('Erro ao tentar acessar a pokeapi', error);
    }
} 

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

async function renderPokemonList() {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = ''; // Limpa a lista antes de renderizar os novos itens

    const pokemons = await fetchPokemon(offset);
    
    pokemons.forEach(async pokemon => {
        const listItem = document.createElement('li');
        listItem.classList.add('pokemon');
        
        fetchPokemonDetails(pokemon.url).then(pokemonDetails => {
            const pokemonName = document.createElement('h2');
            pokemonName.textContent = pokemonDetails.name;
            pokemonName.classList.add('pokemon-name');
            const img = document.createElement('img');
            img.classList.add('pokemon-image');
            const pokemonId = pokemonDetails.id;
            console.log(pokemonId);
            pokemonNumber = document.createElement('p');
            pokemonNumber.textContent = `#${pokemonId}`; // Exibe o número do Pokémon
            pokemonNumber.classList.add('pokemon-number');
            const pokemonTypes = document.createElement('ol');
            pokemonTypes.classList.add('types');
            pokemonDetails.types.forEach(type => {
                const typeItem = document.createElement('li');
                typeItem.textContent = type.type.name;
                pokemonTypes.appendChild(typeItem);
                typeItem.classList.add(`type-detail`);
            });
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
            img.alt = pokemon.name;
            listItem.appendChild(pokemonName);
            listItem.appendChild(pokemonNumber);
            const pokemonDetailsDiv = document.createElement('div');
            pokemonDetailsDiv.classList.add('pokemon-details');
            pokemonDetailsDiv.appendChild(pokemonTypes);
            pokemonDetailsDiv.appendChild(img);
            listItem.appendChild(pokemonDetailsDiv);
        })
        //const img = document.createElement('img')
        //img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageOffset++}.png`;// Incrementa o imageOffset
        //console.log(img); // Exibe o valor de imageOffset no console
        //listItem.appendChild(img);
        pokemonList.appendChild(listItem);
        

    });

    // Atualiza a visibilidade dos botões de navegação
    document.getElementById('prevBtn').disabled = offset === 0;
    document.getElementById('nextBtn').disabled = offset + limit >= 1118; // 1118 é o número total de Pokémon na PokeAPI
}

function nextPage() {
    offset += limit;
    renderPokemonList();
}

function prevPage() {
    offset = Math.max(0, offset - limit);
    renderPokemonList();
}

function searchPokemon () {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value;
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = '';
    fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${searchValue}`).then(pokemonDetails => {
        const listItem = document.createElement('li');
        listItem.classList.add('pokemon');
        const pokemonName = document.createElement('h2');
        pokemonName.textContent = pokemonDetails.name;
        pokemonName.classList.add('pokemon-name');
        const img = document.createElement('img');
        img.classList.add('pokemon-image');
        const pokemonId = pokemonDetails.id;
        console.log(pokemonId);
        pokemonNumber = document.createElement('p');
        pokemonNumber.textContent = `#${pokemonId}`; // Exibe o número do Pokémon
        pokemonNumber.classList.add('pokemon-number');
        const pokemonTypes = document.createElement('ol');
        pokemonTypes.classList.add('types');
        pokemonDetails.types.forEach(type => {
            const typeItem = document.createElement('li');
            typeItem.textContent = type.type.name;
            pokemonTypes.appendChild(typeItem);
            typeItem.classList.add(`type-detail`);
        });
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        img.alt = pokemonDetails.name;
        listItem.appendChild(pokemonName);
        listItem.appendChild(pokemonNumber);
        const pokemonDetailsDiv = document.createElement('div');
        pokemonDetailsDiv.classList.add('pokemon-details');
        pokemonDetailsDiv.appendChild(pokemonTypes);
        pokemonDetailsDiv.appendChild(img);
        listItem.appendChild(pokemonDetailsDiv);
        pokemonList.appendChild(listItem);
    });

}

// Renderiza a lista de Pokémon ao carregar a página
window.onload = renderPokemonList;
