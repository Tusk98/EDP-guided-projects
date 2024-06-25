let producerSpan;
let titleSpan;
let directorSpan;
let releaseDateSpan;
let charactersUl;
let planetsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#filmName');
  producerSpan = document.querySelector('span#producer');
  titleSpan = document.querySelector('span#title');
  directorSpan = document.querySelector('span#director');
  charactersUl = document.querySelector('#characters>ul'); 
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getMovie(id)
});

async function getMovie(id) {
  let movie;
  try {
    movie = await fetchMovie(id)
    movie.characters = await fetchCharacters(movie)
    movie.planets = await fetchPlanets(movie)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderMovie(movie);

}
async function fetchMovie(id) {
  let movieUrl = `${baseUrl}/films/${id}`;
  return await fetch(movieUrl)
    .then(res => res.json())
}

async function fetchCharacters(movie) {
  const url = `${baseUrl}/films/${movie?.id}/characters`;
  const chars = await fetch(url)
    .then(res => res.json())
  return chars;
}

async function fetchPlanets(movie) {
  const url = `${baseUrl}/characters/${movie?.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderMovie = movie => {
    document.title = `SWAPI - ${movie?.title}`;  // Just to make the browser tab say their name
    nameH1.textContent = movie?.title;
    producerSpan.textContent = movie?.producer;
    titleSpan.textContent = movie?.title;
    directorSpan.textContent = movie?.director;
    
    const charLis = movie?.characters?.map(cha => `<li><a href="/character.html?id=${cha.id}">${cha.name}</li>`);
    charactersUl.innerHTML = charLis.join("");
    
    const planetLis = movie?.planets?.map(pla => `<li><a href="/planet.html?id=${pla.id}">${pla.name}</li>`);
    planetsUl.innerHTML = planetLis.join("");
}
