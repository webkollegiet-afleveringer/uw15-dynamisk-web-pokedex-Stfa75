const pokeList = document.querySelector("#info") /* her hiver jeg fat i min id fra html fil ved samme navn*/
const url = new URL(`https://pokeapi.co/api/v2/pokemon/`)

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            const listItem = document.createElement(`li`);
            
            // Vi bruger innerHTML i stedet for textContent
            // Vi sender pokemon.name med som et "id" i URL'en
            listItem.innerHTML = `
            <div class"pokemond-card>
                <h3> ${pokemon.name}</h3>
                <a href="detaljer.html?id=${pokemon.name}"> se detaljerne her</a>
                </div>   
                
            `;
            
            pokeList.append(listItem);
        });
    });