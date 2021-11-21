//get pokemon name from form and fetch from api

function getPokemonByName(){
    var pokemonName = document.getElementById("pokemonName").value;
    console.log(pokemonName);
    pokemonNames = pokemonName.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNames}`)
    .then(response => response.json())
    .then(data => {
        var abilities = data.abilities;
        document.getElementById("pokemon-list").innerHTML = `

        <div class="pokemon-card">
        <h1 id="pokemon-name" style="text-transform:capitalize;">${data.name}</h1>
        <h3 style="text-transform:capitalize;">Type: ${data.types[0].type.name}</h3>
        <h3>Height: ${data.height} ft</h3>
        <h3>Weight: ${data.weight} lb</h3>
         <h3>Abilities:</h3>
        <ul>
        ${abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        </div>
        `;
    })
    .catch(error => {
        document.getElementById("pokemon-list").innerHTML = `
        <div class="error">
        <h3 class="error">No Pokemon Found</h3>
        </div>
        `;
        document.getElementById('pokemonName').value = "";

    });
}   

