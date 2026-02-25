const searc = window.location.search;
const urlSearc = new URLSearchParams(searc);
// console.log(urlSearc.get("id"));
const id = urlSearc.get("id");
const infoSearch = document.querySelector("#detaljer");

const url = `https://pokeapi.co/api/v2/pokemon/${id}`; 

console.log(url);

fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
        renderPokemon(data)

    })

function renderPokemon(data) {
    const name = data.name;
    const image = data.sprites.other["official-artwork"].front_default;
    const weight = data.weight;
    const height = data.height;
    
    // PokeAPI stats ligger i et array. Her henter vi dem via deres index:
    const hitp = data.stats[0].base_stat;   // HP
    const attack = data.stats[1].base_stat; // Attack
    const defend = data.stats[2].base_stat; // Defense
    const satk = data.stats[3].base_stat;   // Special-attack
    const sdef = data.stats[4].base_stat;   // Special-defense
    const spd = data.stats[5].base_stat;    // Speed

    // Vi tager de første 3 moves og laver til en tekststreng
    const moves = data.moves.slice(0, 3).map(m => m.move.name).join(", ");/* 0,3 betyder at vi tager den første plads og slutter ved den 2 plads(3 i alt)*/
   /*Når man "slicer" (skærer) i et array, det svarer det til at tage en kopi af en bestemt del af din liste, 
   uden at ødelægge den originale liste.* - der slices fordi det er de stats, fra arrayet der skal vises* map deler */
    const types = data.types.map(t => t.type.name).join(", ");




    const pokedexString = /*html*/
        `
<div class="beast">
<div class="billede">
            <img src="${image}" alt="billede af ${name}">
            </div>
            <div class="oversigt">
            <h1>${name}</h1>
            <h4>${weight}</h4>
            <h4>${height}</h4>
            <h4>${moves}</h4>
            </div>
            <div class="basestats">
            <h3>Basestats</h3>
            <h4>${hitp}</h4>
            <h4>${attack}</h4>
            <h4>${defend}</h4>
            <h4>${satk}</h4>
            <h4>${sdef}</h4>
            <h4>${hitp}</h4>
            <h4>${spd}</h4>
            </div>   
`
    infoSearch.insertAdjacentHTML("afterbegin",pokedexString);
    

}