const apiKey = "9b74404cae5eeb908e7c4b7214b34705";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city), {
            mode: "cors"
        });
        const respData = await resp.json();
        addWeatherToPage(respData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function addWeatherToPage(data) {
    if (!data || !data.main) {
        console.error("Error: Invalid weather data received:", data);
        return;
    }

    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /> ${temp}°C
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
        </h2>
        <small>${data.weather[0].main}</small>
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}


function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value.trim(); 
    if (city) {
        getWeatherByLocation(city);
    }
});
