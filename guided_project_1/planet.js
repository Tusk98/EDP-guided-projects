let nameH1;
let climateSpan;
let diameterSpan;
let terrainSpan;
let surfacewaterSpan;
let populationSpan;
let rotationPeriodSpan;

const baseUrl = `https://swapi2.azurewebsites.net/api`;


// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climateSpan = document.querySelector('span#climate');
    diameterSpan = document.querySelector('span#diameter');
    terrainSpan = document.querySelector('span#terrain');
    populationSpan = document.querySelector('span#population');
    surfacewaterSpan = document.querySelector('span#surfaceWater');
    rotationPeriodSpan = document.querySelector('span#rotationPeriod');
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id);
  });

  async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacters(planet)
      planet.films = await fetchFilms(planet)
    }
    catch (ex) {
      console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }

  async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }
  
  async function fetchCharacters(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }
  
  async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }
  
  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;

    climateSpan.textContent = planet?.climate;
    diameterSpan.textContent = planet?.diameter;
    terrainSpan.textContent = planet?.terrain;
    populationSpan.textContent = planet?.population;
    surfacewaterSpan.textContent = planet?.surface_water;
    rotationPeriodSpan.textContent = planet?.rotation_period;

    const charactersList = planet?.characters?.map(character =>  `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersList.join("");
    
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
  }
  