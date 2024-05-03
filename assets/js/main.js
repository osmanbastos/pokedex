let offset = 0;
const limit = 12;
let imageOffset = (offset + 1); // Declara a variável imageOffset e inicializa com o valor de offset + 1

async function fetchPokemon(offset) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
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
        listItem.textContent = pokemon.name;
        
        fetchPokemonDetails(pokemon.url).then(pokemonDetails => {
            const img = document.createElement('img');
            const pokemonId = pokemonDetails.id;
            console.log(pokemonId);
            pokemonNumber = document.createElement('p');
            pokemonNumber.textContent = `#${pokemonId}`; // Exibe o número do Pokémon
            const pokemonAbilities = document.createElement('span');
            pokemonAbilities.textContent = `${pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}`;
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
            img.alt = pokemon.name;
            listItem.appendChild(pokemonNumber);
            listItem.appendChild(img);
            listItem.appendChild(pokemonAbilities);
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

// Renderiza a lista de Pokémon ao carregar a página
window.onload = renderPokemonList;
