const searc = window.location.search;
const urlSearc = new URLSearchParams(searc);
// console.log(urlSearc.get("id"));
const id = urlSearc.get("id");
const infoSearch = document.querySelector("#detaljer");

const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

console.log(url);

fetch(url)
    .then((Response) => Response.json())
    .then(async (data) => {
        const speciesData = await getSpeciesData(data.species.url)
        renderPokemon(data, speciesData)
        console.log(data);


    })

async function getSpeciesData(url) {
    const respons = await fetch(url)
    return await respons.json()
}

function renderPokemon(data, speciesData) {
    // console.log(speciesData.flavor_text_entries[0].flavor_text)
    const name = data.name;
    const image = data.sprites.other["official-artwork"].front_default;

    const weight = data.weight;
    const height = data.height;

    /*flevor-text***/
    /* --- HER ER DIN VARIABLE TIL SPECIES TEKST --- */
    // Vi leder efter den første indgang, hvor sproget er engelsk ("en")
    const flavorEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");

    // Vi renser teksten for mærkelige tegn som \f og \n, så den ser pæn ud
    const flavor = flavorEntry
        ? flavorEntry.flavor_text.replace(/[\f\n\r]/gm, ' ')
        : "Ingen beskrivelse fundet.";


    // PokeAPI stats 0903
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

<div class= "top">
 <img src ="img/arrow_back.svg" alt ="pil tilbage">
 <h2>${name}<h2>
</div>
<div class="billede">
            <img src="${image}" alt="billede af ${name}">
            </div>
<div class= "ability">
    <h3>${types}</h3>
    </div>
    <p>about</p>

            <div class="oversigt">
            <div class= weight>
            <h4>${weight}</h4></div>
            <div class="height"><h4>${height}</h4></div>
            <div class="move"><h4>${moves}</h4></div>
            
            <div class="art">
            <h3>${flavorEntry}</div>
            
            <div class="basestats">
            <h3>Basestats</h3>
            <h4>HP ${hitp}</h4>
            <h4>ATK ${attack}</h4>
            <h4>DEF ${defend}</h4>
            <h4>SATK ${satk}</h4>
            <h4>SDEF${sdef}</h4>
            <h4>SPD ${spd}</h4>
            </div>   
`
    infoSearch.insertAdjacentHTML("afterbegin", pokedexString);


}