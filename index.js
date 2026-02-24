const pokeList = document.querySelector("#info") /* her hiver jeg fat i min id fra html fil ved samme navn*/
const url = new URL(`https://pokeapi.co/api/v2/pokemon/`)

fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach(pokemon => {
        const listItem = document.createElement(`li`);
        listItem.textContent = pokemon.name;
        pokeList.append(listItem);
    }));