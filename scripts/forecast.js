// for interacting with the weather API...for free accounts only 50 requests per day...

class Forecast{
    constructor(){
        this.key = 'D8bGw3mx12SZo87n5MWtX0Nz1kGnDQhG';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){
        const cityDetails = await this.getCity(city);//func from forecast.js
        const weather = await this.getWeather(cityDetails.Key);

        return{cityDetails, weather}
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch (this.cityURI + query); //+ add them together as single arg(complete URL)...returns a promise
        const data = await response.json()  //json() method returns a promise...reason for another await
    
        return data[0];
    };
    async getWeather(id){

        //instead of putting key directly after resource URL do it in a query var
        const query = `${id}?apikey=${this.key}`; 

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];

    };
};
