const DETAILS_BASE_URL = 'https://api.countrylayer.com/v2/';
const options={}



const fetchApiAxios = async (url, options) => {
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        },
        params: options,
    });

    return res.data;
};


const createCountryCard = (object) => {
    if(!object){
        return `<h3>we didn't finf any result</h3>`;
    }
    const coinKeys = Object.keys(object.currencies);
    const lanKeys = Object.keys(object.languages);
    let languages = lanKeys.map((item) => object.languages[item]);
    languages = languages.join(", ")

    let currencies = coinKeys.map((item) => object.currencies[item].name + " " + object.currencies[item].symbol);
    currencies = currencies.join(" ");
    const country = document.createElement("div");
    const map=document.createElement("div");
    country.className =
        country.innerHTML = `
        <div class='d-flex justify-content-center'>
    <div class="d-flex justify-space-around">
    <img alt="${object.flags.alt}" src="${object.flags.svg}" style="width:450px"/>
    <div class="text ml-5">
        <h2 class="display-2 country-title">${object.name.common}</h2>
        <div class="display-6"><strong>Population:</strong> ${object.population}</div>
        <div class="display-6"><strong>Capital:</strong> ${object.capital}</div>
        <div class="display-6"><strong>Region:</strong> ${object.region}</div>
        <div class="display-6"><strong>Languages:</strong> ${languages}</div>
        <div class="display-6"><strong>Currencies:</strong> ${currencies}</div>
        <div class="display-6"><strong>Borders:</strong> </div>${object.borders.map((item)=>`<a href="#" class="p-1 border-item" data-code="${item.cca3}" >${item.name}</a>`).join(" ")}
    </div>
    
</div>
</div>

    `;
map.innerHTML=`<div class="mt-5 container">
<iframe width="100%" height="380px" frameborder="0" scrolling="no" marginheight="0"marginwidth="0"
src="https://maps.google.com/maps?q=${object.latlng[0]},${object.latlng[1]}&hl=iw&z=6&amp;output=embed">
</iframe> 
</div>
`
    country.appendChild(map)
    return country;

}




export { fetchApiAxios, createCountryCard }