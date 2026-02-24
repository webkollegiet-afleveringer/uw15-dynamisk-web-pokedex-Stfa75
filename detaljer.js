const searc = window.location.search;
const urlSearc = new URLSearchParams(searc)
// console.log(urlSearc.get("id"));
const id = urlSearc.get("id")
const infoSearch = document.querySelector("#detaljer")

const url = `https://pokeapi.co/api/v2/pokemon/${id}`

console.log(url);

fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
        renderPokemon(data)

    })

function renderPokemon(data) {
    const name = data.name;
    const image = data.sprites.other["official-artwork"].front_default; // Flot stort billede
    const height = data.height;
    const weight = data.weight;
    const moves = data.moves;
    const hitp = data.hp;
    const attack = data.atk;
    const defend = data.def;
    const satk = data.satk;
    const sdef = data.sdef;
    const spd = data.spd;

    const types = data.types.map(t => t.type.name)




    const destinationString = /*html*/
        `
<div class="beast">
<div class="billede">
            <img src="img/${image}" alt="billede af ${name}">
            </div>
            <div class="oversigt">
            <h1>${name}</h1>
            <h2>${weight}</h2>
            <h3>${height}</h3>
            <h3>${moves}</h3>
            </div>
            <div class="basestats">
            <h4>Basestats</h4>
            <h4>${subtitle}</h4>
            <p>${text}</p>
            <ul>
                ${facilities.map(facility => `<li>${facility}</li>`).join('')}
            </ul>
            
            <div class="more">
            <a href = index.html> Gå til forsiden</a>
            <button class=" favorite heart" data-id="${id}">
            <svg class=" img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C8.20072 13.9997 8.39672 13.9391 8.5625 13.8259C11.0184 12.1587 12.0819 11.0156 12.6684 10.3009C13.9184 8.7775 14.5169 7.21344 14.5 5.51969C14.4803 3.57875 12.9231 2 11.0288 2C9.65125 2 8.69719 2.77594 8.14157 3.42219C8.12397 3.44245 8.10222 3.4587 8.0778 3.46984C8.05337 3.48098 8.02685 3.48674 8 3.48674C7.97316 3.48674 7.94663 3.48098 7.92221 3.46984C7.89779 3.4587 7.87604 3.44245 7.85844 3.42219C7.30282 2.77531 6.34875 2 4.97125 2C3.07688 2 1.51969 3.57875 1.5 5.52C1.48313 7.21406 2.08219 8.77813 3.33157 10.3013C3.91813 11.0159 4.98157 12.1591 7.4375 13.8263C7.60332 13.9393 7.79932 13.9998 8 14Z" fill="black"/>
</svg>
</button>
</div>
</div>
   
`
    infoSearch.insertAdjacentHTML("afterbegin", destinationString);
    console.log(destinationString);

}