const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const displayPokemon = async () => {
  try {
    const pokemonSelect = searchInput.value.toLowerCase();
    const answer = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonSelect}`);
    const data =  await answer.json();

    // Set Pokemon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `<img id = "sprite" src = "${data.sprites.front_default}" alt = "${data.name} front default sprite">`;

    // Set Pokemon stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set types
    types.innerHTML = data.types
    .map(obj => `<span class = "type ${obj.type.name}">${obj.type.name}</span>`)
    .join('');


  } catch (err) {
    resetDisplay();
    alert("Pokémon not found");
    console.log(`Pokémon not found: ${err}`);
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  // Reset stats
  pokemonName.textContent = ``;
  pokemonID.textContent = ``;
  weight.textContent = ``;
  height.textContent = ``;
  hp.textContent = ``;
  attack.textContent = ``;
  defense.textContent = ``;
  specialAttack.textContent = ``;
  specialDefense.textContent = ``;
  speed.textContent = ``
  types.innerHTML = ``;
};

searchForm.addEventListener('submit', input => {
  input.preventDefault();
  displayPokemon();
});
