//fetch from the api
function getPokemon(){
 fetch('https://pokeapi.co/api/v2/pokemon?limit=10').then(function(response){
   return response.json();
 })
}
fetchedData = getPokemon();
document.getElementById("pokemon-list").innerHTML = 
`
<li>${fetchedData}</li>
`;