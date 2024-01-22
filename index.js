const container = document.querySelector('.wrapper');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '1727b5960d297292cb8333d334d888f7'
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '200px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
        } 

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const date = document.querySelector('.weather-box .date');
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');

        const details = document.querySelectorAll('.detail');

        const feel = details[0].querySelector('.detail span');
        const humidity = details[1].querySelector('.detail span');
        const wind = details[2].querySelector('.detail span');
        const visibility = details[3].querySelector('.detail span');
        const sea_level = details[4].querySelector('.detail span')

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'img/clear.png';
                break;
            case 'Rain':
                image.src = 'img/rain.png';
                break;
            case 'Snow':
                image.src = 'img/snow.png';
                break;
            case 'Clouds':
                image.src = 'img/cloud.png';
                break;
            case 'Mist':
                image.src = 'img/mist.png';
                break;
            case 'Thunderstorm':
                image.src = 'img/thunderstorm.png';
                break ;
            default:
                image.src = ''
        }
        const timestamp = (new Date().getTime()) + (json.timezone*1000);
        const date_now = (new Date(timestamp)).toUTCString();
        const re = /(.+) GMT/;
        const match = date_now.match(re);

        date.innerHTML = `${match[1]}`;

        temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C </span>`;
        description.innerHTML = `${json.weather[0].description}`;
        feel.innerHTML = `${parseInt(json.main.feels_like)}<span> °C </span>`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
        visibility.innerHTML = `${parseInt(json.visibility)}<span> m </span>`;
        sea_level.innerHTML =  `${parseInt(json.main.sea_level)}<span> m </span>`;

    });
});

search.addEventListener('click', () => {
    const APIKey = '1727b5960d297292cb8333d334d888f7'
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '200px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
        } 

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const uniqueForecastDays = []
        const fiveDaysForecast = json.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        const cards = document.querySelectorAll('.card');

        for(let i = 0 ; i < cards.length ; i++){
            const imagef = cards[i].querySelector('.card img');
            const datef = cards[i].querySelector('.card .datef')
            const temperaturef = cards[i].querySelector('.card .temperaturef');
            const descriptionf = cards[i].querySelector('.card .descriptionf');
            switch(fiveDaysForecast[i].weather[0].main){
                case 'Clear':
                    imagef.src = 'img/clear.png';
                    break;
                case 'Rain':
                    imagef.src = 'img/rain.png';
                    break;
                case 'Snow':
                    imagef.src = 'img/snow.png';
                    break;
                case 'Clouds':
                    imagef.src = 'img/cloud.png';
                    break;
                case 'Mist':
                    imagef.src = 'img/mist.png';
                    break;
                case 'Thunderstorm':
                    image.src = 'img/thunderstorm.png';
                    break ;
                default:
                    imagef.src = ''
            }
            datef.innerHTML = `${uniqueForecastDays[i]}`
            temperaturef.innerHTML = `${parseInt(fiveDaysForecast[i].main.temp)}<span> °C </span>`;
            descriptionf.innerHTML = `${fiveDaysForecast[i].weather[0].description}`;
        }

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '700px';
        container.style.width = '1100px';
        container.style.margin = '0%';
    });
});