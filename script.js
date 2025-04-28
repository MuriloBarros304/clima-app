const apiKey = "5d2946ec0f77fbb590f94c310233f23d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

/**
 * Atualiza a imagem do clima de acordo com o valor passado pela API
 * @param {String} data  Valor retornado pela API
 * @returns {void}
 */
function updateImg(data) {
    weatherIcon.src = `images/${data.toLowerCase()}.png`;
}

/**
 * Verifica o clima da cidade passada pelo usuário
 * @param {String} city  Nome da cidade passada pelo usuário
 * @returns {void}
 */
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    
    if(response.status == 404) { // Caso a cidade não seja encontrada
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed.toFixed(1) + " km/h";
    
        updateImg(data.weather[0].main); // Atualiza a imagem do clima

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
