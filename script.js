const apiKey = "5d2946ec0f77fbb590f94c310233f23d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed.toFixed(1) + " km/h";
    
        updateImg(data.weather[0].main)

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"
    }
}

function updateImg(data) {
    weatherIcon.src = `images/${data.toLowerCase()}.png`
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
