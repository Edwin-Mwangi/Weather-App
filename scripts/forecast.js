// for interacting with the weather API...for free accounts only 50 requests per day...
//...to overcome delete an app and create another and you'll be given another key


//Api key
const key = 'D8bGw3mx12SZo87n5MWtX0Nz1kGnDQhG';

//2 requests to be made.One to get the city info endpoint to acquire city code
//the sendo is to send city code to weather conditions Api to get weather conditions to that area 

//the resource URL is the endpoint by which you link the your app with the response site
//at accuweather once u go from APIreferences to Location APi and click city search u can send request and response will be arr with Objs
//A key from one of the Objs is required for next step(try it)

//GET CITY API CALL
//async func to make request in code
//returns a promise so .then is to be included after calling func
const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch (base + query); //+ add them together as single arg...returns a promise
    const data = await response.json()  //json() method returns a promise...reason for another await

    //console.log(data);//...may return alot of cities with same names choose one u want from array

    return data[0];
}

getCity('nairobi')
    .then(data =>console.log('resolved', data)) 
    .catch(err =>console.log('rejected', err));

//...template strs offer more flexibility
// '?' in a URL means that we are adding a query into the endpoint
//& means it the next query param....all these stuff is seen inURL
//copy the attributes as they are spelled in accuweather ie apikey and q(check accuweather City Search)
//base is the general resource URL
//the async above didn't have a param b4,we added it to use the city Loc as an arg that we canq uery in the templatestring....ie
//instead of putting a permanent city in the string the city is put in by person using the func

//once func is called the obj has a Key to be used in the next Phase

//GET WEATHER API

const getWeather = async (id) =>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

    //instead of putting key directly after resource URL do it in a query var
    const query = `${id}?apikey=${key}`; //apikey required in accuweather currentconditions 

    const response = await fetch(base + query);
    const data = await response.json();
    //console.log(data[0]);

    return data[0];

};

// getWeather("224758");
//id is the param representing the Key gotten from getCity func..can call it what u want

//we could use getCity to call getWeather with the key returned from the city key in the func ie

getCity('nairobi')
    .then(data => {
        return getWeather(data.Key); //returns a promise so chaining .then
    }).then(data =>{
        console.log(data);
    }) 
    .catch(err =>console.log('rejected', err));

//we are calling getCity which return getWeather which when resolved a .then is called to console.log data from line 56...we could 
//console.log the data out inside getWeather() func as an alternative to the .then