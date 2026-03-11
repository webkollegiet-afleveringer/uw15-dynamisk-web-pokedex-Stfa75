const main = document.querySelector("#wrapper");
const mainD = document.querySelector("main"); // Den tomme <main> i din HTML
console.log("hej med dig");

let baseURL = "https://pokeapi.co/api/v2/pokemon"
const all = 1350;
const pokemonwrapperDom = document.querySelector("main")
// Opretter containere med det samme
// mainD.insertAdjacentHTML("beforeend", `<div id="pokemon-wrapper"><div class="pokemon-inner-wrapper"></div></div>`);
// const pokemonwrapperDom = document.querySelector("#pokemon-wrapper")
let searchMethod = "name";
let pokemons = []

async function init() {
    console.log("1 init starter");

    // 1. Hent data
    const url = `${baseURL}?limit=${all}`;
    const res = await fetch(url)
    const data = await res.json()
    pokemons = data.results

    // 2. Tegn Header (vigtigt at den kører før vi leder efter #search)
    renderHeader();

    // 3. Find input-feltet nu hvor det ER tegnet i DOM'en
    const searchDom = document.querySelector("#search")
    console.log(searchDom);

    if (searchDom) {
        searchPokemon(searchDom)
    }
    shiftSearchMethod(searchDom);
}
function shiftSearchMethod(searchDom) {
    const sortButtonDom = document.querySelector("#knap");
    sortButtonDom.addEventListener("click", () => {
        searchMethod = searchMethod === "name" ? "id" : "name";
        console.log(searchMethod);

        shiftSearchIcon(searchMethod, sortButtonDom)
    }
    )
}

function shiftSearchIcon(searchMethod, sortButtonDom) {
    const inputDom = sortButtonDom.closest("header").querySelector("#search")
    inputDom.value = "";
    if (searchMethod === "id") {
        sortButtonDom = "";
        sortButtonDom = "img/tag.svg"

    } else {
        sortButtonDom = "";
        sortButtonDom = "img/sort-sortButtonDom.svg";
    }
}


function searchPokemon(searchDom) {
    searchDom.addEventListener("input", (event) => {
        console.log("LYTTER VIRKER! Du skrev:", event.target.value)
        const inputValue = event.target.value.toLowerCase();
        runSearch(inputValue); // Send værdien med ind i runSearch
    })
}

function runSearch(inputValue) { // Modtag værdien her
    const value = inputValue.trim()
    console.log("Hvor mange pokemons kigger jeg i?:", pokemons.length);

    if (!value) {
        pokemonwrapperDom.innerHTML = "";
        showPokemon(pokemons)
        return;
    }
    let pokemonSearchArray;
    if (searchMethod === "name") {
        pokemonSearchArray = searchByName(pokemons, value);
    } else {
        pokemonSearchArray = searchById(pokemons, value)
    }

    showPokemon(pokemonSearchArray);
}
function searchById(pokemonsArray, id) {
    id = Number(id);
    let searchResult = pokemonsArray.filter((pokemon) => {
        let pokemonUrlNumber = Number(getIdFromPokemon(pokemon.url))
        console.log(`Tjekker URL-nummer: ${pokemonUrlNumber} mod søge-id: ${id}`);

        if (pokemonUrlNumber == 10001) {
            id += 8975
        }
        return pokemonUrlNumber == id
    });
    return searchResult
}

function showPokemon(data) {

    // const pokemonwrapperDom = document.querySelector("main")
    pokemonwrapperDom.innerHTML = "";

    const pokemonTemplates = data.map((pokemon) => {

        const pokemonIndex = getIdFromPokemon(pokemon.url);
        const basePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

        // Jeg fjernede 'shiny' fra stien så de matcher de fleste standard opsætninger, 
        // men du kan sætte det ind igen hvis du vil have shiny versioner.
        const imgPath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;

        return /*html*/`
            <figure class="pokemon-card">
                <span class="pokemon-number">${formatPokemonNumber(pokemonIndex)}</span>
                <img src="${imgPath}" alt ="${pokemon.name}"/>
                <figcaption>
                    <span>${pokemon.name}</span>
                    <a href="detaljer.html?id=${pokemonIndex}" class="pokemon-link">SE MERE</a>
                </figcaption>
            </figure>`
    })
        .join("");

    pokemonwrapperDom.innerHTML = pokemonTemplates;
}
// Hjælpefunktioner
function formatPokemonNumber(id) {
    // Hvis id er "1", bliver det til "001"
    return "#" + String(id).padStart(3, '0');
}

function searchByName(pokemonsArray, letter) {
    return pokemonsArray.filter((pokemon) =>
        pokemon.name.includes(letter.toLowerCase())
    );
}

// Du skal have denne med for at displayPokemon virker:
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}
function renderHeader(searchIcon) {
    // 1. Find kassen i din HTML
    const headerDom = document.querySelector(".main-header");


    const header = /*html*/`
            <div class="search-bar">
                <div class="overskrift">
                    <img src="img/pokeball.svg" alt="logo">
                    <h3>Pokedex</h3>
                </div>
                <div class="bar">
                    <input type="text" placeholder=".......search...." id="search">
                    <img src="img/Sort-Button.svg" alt="searchfilters" id="knap">
                </div>
            </div>`;
    if (headerDom) {
        // 3. Sæt indholdet IND i kassen
        headerDom.innerHTML = header;

        // 4. Find filterknappen (nu hvor den ER tegnet)
        const filterKnap = document.getElementById("knap");
        let isTextMode = true;

        if (filterKnap) {
            filterKnap.addEventListener("click", () => {
                // Skift tilstanden
                isTextMode = !isTextMode;

                // Skift billedet
                if (isTextMode) {
                    filterKnap.src = 'img/Sort-Button.svg';
                } else {
                    filterKnap.src = 'img/tag.svg';
                }
                console.log("Billedet er nu: " + filterKnap.src);
            });
        } // <--- Her slutter if (filterKnap)

    } else {
        // Hvis kassen ikke findes, får du en besked i konsollen i stedet for en fejl
        console.error("Kunne ikke finde .main-header i din HTML!");
    } // <--- Her slutter if (headerDom)
}
init()