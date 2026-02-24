const pokeList = document.querySelector("#info")
const url = new URL(`https://pokeapi.co/api/v2/pokemon`)

fetch(url)
    .then((Response) => Response.json())
    .then((data) => data.result.forEach(pokemon => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.name;
        listItem.append(listItem);
    }));