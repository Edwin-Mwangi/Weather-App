// for interacting with the weather API...for free accounts only 50 requests per day...

//Api key
const key = 'D8bGw3mx12SZo87n5MWtX0Nz1kGnDQhG';

//GET CITY API CALL

const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch (base + query); //+ add them together as single arg(complete URL)...returns a promise
    const data = await response.json()  //json() method returns a promise...reason for another await

    return data[0];
};

//GET WEATHER API

const getWeather = async (id) =>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

    //instead of putting key directly after resource URL do it in a query var
    const query = `${id}?apikey=${key}`; 

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};
