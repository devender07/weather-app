const searchBtn = document.getElementById("searchbutton");
const resultToday = document.getElementById("today");
const tommarow = document.getElementById("tommarow")
const today = document.getElementById("fore")

searchBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('input').value;
    getWeather(cityInput);
    getForecast(cityInput);
});

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const cityInput = input.value;
        getWeather(cityInput);
        getForecast(cityInput);
    }
});

function getWeather(city) {
    const apiKey = '1d2d8412ddf2ca24752a969a4abaa6a8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error:', error);
            resultToday.innerHTML = 'An error occurred. Please try again.';
        });
}

const displayWeather = (data) => {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth()+1
    let year = currentDate.getFullYear()
    const resultHtml =
        `<h1>${cityName}</h1>
    <div class="value">
    <h3>Today</h3>
    <h3>${year}/${month}/${day}</h3>
    <h3>Temperature: ${temperature}°C</h3>
    <h3>Description: ${description}</h3>
    <h3>Humidity: ${humidity}%</h3>
    <h3>Wind Speed: ${windSpeed} m/s</h3>
    </div>`;
    resultToday.innerHTML = resultHtml;
}

// forecast 


function getForecast(city) {
    const apiKey = '1d2d8412ddf2ca24752a969a4abaa6a8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
            todayForecast(data);
        })
        .catch(error => {
            console.log('Error:', error);
            resultToday.innerHTML = 'An error occurred. Please try again.';
        });
}
// forecast today

const todayForecast= (data)=>{
    const forecastList = data.list;
    const array =[];

    for(let i=0 ; i<5; i++){
        const dateTime = forecastList[i].dt_txt.split(" ");

        const time =dateTime[1]; 
        const temperature = forecastList[i].main.temp;
        const description = forecastList[i].weather[0].description;
        const humidity = forecastList[i].main.humidity;
        const windSpeed = forecastList[i].wind.speed;
        
        const resultHtml =
        
        `<div class ="cards">
            <h3>Time:${time}</h3>
            <h3>Temperature: ${temperature}°C</h3>
            <h3>Description: ${description}</h3>
            <h3>Humidity: ${humidity}%</h3>
            <h3>Wind Speed: ${windSpeed} m/s</h3>
        </div>`;
        array.push(resultHtml);
    };   
    
    today.innerHTML = array.join(" ");
}







// forecast tommarow //////
const displayForecast = (data) => {
    const forecastList = data.list;
    const cityName = data.city.name;
    const dateTime = forecastList[5].dt_txt.split(" ");
    const date =dateTime[0];
    const time =dateTime[1];    
    const temperature = forecastList[5].main.temp;
    const description = forecastList[5].weather[0].description;
    const humidity = forecastList[5].main.humidity;
    const windSpeed = forecastList[5].wind.speed
    const resultHtml =
        `<h1>${cityName}</h1>
        <div class="value">
            <h3>Tomorrow</h3>
            <h3>${date}</h3>
            <h3>Temperature: ${temperature}°C</h3>
            <h3>Description: ${description}</h3>
            <h3>Humidity: ${humidity}%</h3>
            <h3>Wind Speed: ${windSpeed} m/s</h3>
        </div>`;

    tommarow.innerHTML = resultHtml;
};