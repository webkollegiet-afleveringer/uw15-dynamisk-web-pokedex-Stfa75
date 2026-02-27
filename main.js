let currentOffset = 0;
const limit = 20;
const artWorkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function fetchPokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((respons) => respons.json())
        .then((data) => {
            displayPokemon(data);
        });
}

const mainDom = document.querySelector("main");

function displayPokemon(data) {
    const results = data.results;
    const pokemonString = results.map((result) => {
        const { name, url } = result;
        const id = pokeId(url);
        return /*html*/ `
            <div class="pokemon-card">
                <span class="poke-id">##${id}</span>
                <img src="${artWorkUrl}${id}.png" alt="${name}">
                <div class="poke-info">
                    <h3>${name}</h3>
                    <a href="detaljer.html?id=${name}">Se detaljer</a>
                </div>
            </div>`;
    }).join("");

    mainDom.insertAdjacentHTML("beforeend", pokemonString); // "beforeend" er bedre til infinite scroll

    let lastCard = document.querySelector("main .pokemon-card:nth-last-child(5)");
    lastCard.classList.add("observer")

    if (lastCard) {
        observer.observe(lastCard);
    }
}

function pokeId(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            currentOffset = currentOffset + 20;
            if (currentOffset < 1330) {
                fetchPokemon(currentOffset);
            } else {
                console.log("END");
            }

        }
    });
}, {
    threshold: 0.5
});

fetchPokemon(currentOffset);