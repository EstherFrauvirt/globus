import { fetchApiAxios, createCountryCard } from "./functions.js";
let country = "israel";
const options = {}
const mapholder = document.getElementById("map");


const DETAILS_BASE_URL = ' https://restcountries.com/v3.1/';
const navBtns = document.querySelectorAll(".nav-btn");

[...navBtns].map((item) => item.addEventListener('click', async (e) => {
  country = e.target.dataset.country;
  try {
    const res = await fetchApiAxios(`${DETAILS_BASE_URL}name/${country}?fields=name,capital,currencies,region,population,languages,flags,borders,latlng`, options);
    container.innerHTML = '';
    const bordersNamesPromises= res[0].borders.map((async border=>{
      const result= await fetchApiAxios(`${DETAILS_BASE_URL}alpha/${border}?fields=name,cca3`, options);
      return {name:result.name.common,cca3:result.cca3};
    }))
    const bordersNames = await Promise.all(bordersNamesPromises);

    res[0].borders=bordersNames;
    addContent(container, createCountryCard(res[0]))
  }
  catch (err) {
    console.log(err);
  }

}))



const addContent = (holder, element) => {

  holder.appendChild(element);
  const borderItems = document.querySelectorAll(".border-item");
  [...borderItems].map((item) => { item.addEventListener('click', createAgain) })
}

const searchCountry = async (e) => {
  const value = document.getElementById("searchInput").value;

  try  {
     const res = await fetchApiAxios(`${DETAILS_BASE_URL}translation/${value}?fields=name,capital,currencies,region,population,languages,flags,borders,latlng`, options);

  container.innerHTML = '';
  const bordersNamesPromises= res[0].borders.map((async border=>{
    const result= await fetchApiAxios(`${DETAILS_BASE_URL}alpha/${border}?fields=name,cca3`, options);
    return {name:result.name.common,cca3:result.cca3};
  }))
  const bordersNames = await Promise.all(bordersNamesPromises);
  res[0].borders=bordersNames;
  addContent(container, createCountryCard(res[0]))
  }
  catch(err){
    alert("we didnt find such place");
  }
 
}


const createAgain = async (event) => {
  container.innerHTML = ''
  const country = event.target.dataset.code;

    const res = await fetchApiAxios(`${DETAILS_BASE_URL}alpha/${country}?fields=name,capital,currencies,region,population,languages,flags,borders,latlng`, options);
    const bordersNamesPromises= res.borders.map((async border=>{
      const result= await fetchApiAxios(`${DETAILS_BASE_URL}alpha/${border}?fields=name,cca3`, options);
      return {name:result.name.common,cca3:result.cca3};
    }))
    const bordersNames = await Promise.all(bordersNamesPromises);
    res.borders=bordersNames;
  addContent(container, createCountryCard(res))



}
const container = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', searchCountry)



const res = await fetchApiAxios(`${DETAILS_BASE_URL}name/${country}?fields=name,capital,currencies,region,population,languages,flags,borders,latlng`, options);
const bordersNamesPromises= res[0].borders.map((async border=>{
  const result= await fetchApiAxios(`${DETAILS_BASE_URL}alpha/${border}?fields=name,cca3`, options);
  return {name:result.name.common,cca3:result.cca3};
}))
const bordersNames = await Promise.all(bordersNamesPromises);
res[0].borders=bordersNames;
addContent(container, createCountryCard(res[0]))

