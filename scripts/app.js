
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img') 
//update UI
const updateUI = async (data) =>{

    const{ cityDetails, weather } = data;

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

const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;    
icon.setAttribute('src', iconSrc);

let timeSrc = weather.IsDayTime? 'img/day.svg' : 'img/night.svg';

time.setAttribute('src', timeSrc);//img tag has a class of time linked...and we are setting src to the svgs

// remove d-none in div class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};


//updateCity func 
const updateCity = async(city) => {
    const cityDetails = await getCity(city);//func from forecast.js
    const weather = await getWeather(cityDetails.Key);

    return{cityDetails, weather}
}; 

//input form city submission
cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update UI with that city...check updateCity func
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //store city value in local storage   
    localStorage.setItem('city', city); 

    
});

//updating city data to website from localstorage when user loads up website again

//if it exists then it's a truthy val if it doesn't then it returns null which is considered falsey
if(localStorage.getItem('city')){

    //calling func and updating it with city
    updateCity(localStorage.getItem('city')) //returns a promise so a .then update ui with that data
        .then( data => updateUI(data))
        .catch( err => console.log(err));
};
