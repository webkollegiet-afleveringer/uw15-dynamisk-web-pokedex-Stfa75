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

    //renser teksten for mærkelige tegn så den ser pæn ud
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
    const moves = data.moves.slice(0, 3).map(m => ` <span class="move-item">${m.move.name}</span>
`).join('');;/* 0,3 betyder at vi tager den første plads og slutter ved den 2 plads(3 i alt)*/
    /*Når man "slicer" (skærer) i et array, det svarer det til at tage en kopi af en bestemt del af din liste, 
    uden at ødelægge den originale liste.* - der slices fordi det er de stats, fra arrayet der skal vises* map deler */
    const types = data.types.map(t => `
    <span class="type-badge ${t.type.name}">${t.type.name}</span>
`).join('');

    const statNames = {
        'hp': 'HP',
        'attack': 'ATK',
        'defense': 'DEF',
        'special-attack': 'SATK',
        'special-defense': 'SDEF',
        'speed': 'SPD'
    };


    const pokedexString = /*html*/
        `
<div class="beast">
<div class= "top">
 <a href="index.html"><img src ="img/arrow_back.svg" alt ="pil tilbage"></a>
 <h2>${name}<h2></div>
</div>
<div class="billede">
            <img src="img/chevron_left.svg" alt="venstre pil" class="pil">
            <img src="${image}" alt="billede af ${name}">
            <img src="img/chevron_right.svg" alt="højre pil" class="pil">
            </div>
            
     <div class="ability">
    <div class="type-list">  ${types}
    </div>
</div>
</div>

    <h3 class="text1">about</h3>

           <div class="stats-row"> 
           <div class="info-item">
        <div class="info-top">
            <img src="img/weight.png" alt="en vægt">
            <h4>${weight / 10} kg</h4> </div>
        <p>Weight</p>
    </div>

    <div class="info-item">
        <div class="info-top">
            <img src="img/ruler.svg" alt="lineal">
            <h4>${height / 10} m</h4> </div>
        <p>Height</p>
    </div>

    <div class="info-item">
        <div class="moves-stack">
            ${moves} </div>
        <p>Moves</p>
    </div>

</div>

            <div class="art">
            <h3>${flavor}</h3>
            </div>
        <div class="text2">Base Stats</div>
    <table>
    ${data.stats.map(statObj => {
            // 1. Definer dine forkortelser (Ordbogen)
            const statNames = {
                'hp': 'HP',
                'attack': 'ATK',
                'defense': 'DEF',
                'special-attack': 'SATK',
                'special-defense': 'SDEF',
                'speed': 'SPD'
            };

            // 2. Find det korte navn eller brug det originale som fallback
            const shortName = statNames[statObj.stat.name] || statObj.stat.name;

            // 3. Beregn en farve (valgfrit - her er et simpelt eksempel)
            const barColor = statObj.base_stat > 50 ? '#4CAF50' : '#FF5252';

            // 4. Returnér HTML-rækken
            return `
            <tr>
                <th class="stat-navn">${shortName}</th>
                <td class="stat-num">${statObj.base_stat}</td>
                <td>
                   <progress id="file" value="${statObj.base_stat}" max="200"> 32% </progress>
                </td>
            </tr>
        `;
        }).join('')}
</table>

       


       
         `
    infoSearch.insertAdjacentHTML("afterbegin", pokedexString);


}

