///we are going to implement async JS in a weather app
//key in the location and receive the weather of the area 
//You need to register to accuweather and youre given a certainkey

//page behaviour

//UPDATING THE LOCATION


//Here we are to Hookup the form to make the request
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img') 
//update UI
const updateUI = async (data) =>{

    /* const cityDetails = data.cityDetails;
    const weather = data.weather; */

    //DESTRUCTURING
    //the above properties are destructured below
    const{ cityDetails, weather } = data;//from data get cityDetails property and store it in a same cityDetails varName,same for weather

    //much easier edit of the whole div than innerText
    details.innerHTML = `
        <h5 class="my-4">${cityDetails.EnglishName}</h5>
                    <div class="my-4">${weather.WeatherText}</div>
                    <div class="display-4 my-4">
                        <span>${weather.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                    </div>

    `;

//updating time of date an icon images

const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;    //icon no data is from the weatherIcon property
icon.setAttribute('src', iconSrc);

let timeSrc = null;     //used let coz it changes to svg
if(weather.IsDayTime){
    timeSrc = 'img/day.svg';
}else{
    timeSrc = 'img/night.svg';
}

time.setAttribute('src', timeSrc);//img tag has a class of time linked...and we are setting src to the svgs

// remove d-none in div class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};


//updateCity func 
const updateCity = async(city) => {
    // console.log(city);
    const cityDetails = await getCity(city);//func from forecast.js
    const weather = await getWeather(cityDetails.Key);

    //returns a nested Obj
    /* return{
        cityDetails : cityDetails,
        weather : weather
    } */

    //alternative shorthand when name and attributes have similar name
    return{cityDetails, weather}
}; 

//input form city submission
cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim(); //city is the name of inputform in HTML
    cityForm.reset();

    //update UI with that city...check updateCity func
    updateCity(city)
        // .then(data => console.log(data))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

//in accuweather(from weather Obj returned) each weatherIcon is represesented by a diff no : compare wectherIcon and weatherText
//it's 1-44 weatherIcon so diff no's required for each weatherType
//we also have a weather.IsDayTime which returns a boolean so will be important
