var time = new Date();
document.getElementById("timeshown").innerHTML = time;

const locationEl=document.querySelector('#location');
const temperatureEl=document.querySelector('#temperature');
const humidityEl=document.querySelector('#humidity');
const windSpeedEl=document.querySelector('#windSpeed');
const UVEl=document.querySelector('#UV');
const forecastDateEl=document.querySelector('#forecastDate');
const forecastTempEl=document.querySelector('#forecastTemp');
const forecastHumEl=document.querySelector('#forecastHum');
const historyEl=document.querySelector('#history');
let searchHistory = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : [];




function getCityName(){
    event.preventDefault;
    console.log('works')
    let cityName=document.querySelector('#searchInput').value;
    console.log(cityName);
    // document.querySelector('#location').innerHTML= cityName;
    return cityName;
}

async function fetchWeather(cityName){
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5534726c08a3a7f6f9639cde7b366630`;
    const weatherResult= await fetch(api).then((result)=>result.json());

    let apiOneCall= `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherResult.coord.lat}&lon=${weatherResult.coord.lon}&exclude=hourly,daily&appid=5534726c08a3a7f6f9639cde7b366630`
    const oneCallResult= await fetch(apiOneCall).then((result)=>result.json());

    // let apiForecast=`https://samples.openweathermap.org/data/2.5/forecast/daily?id=${weatherResult.id}&appid=5534726c08a3a7f6f9639cde7b366630`;
    // const apiForecastResult= await fetch(apiForecast).then((result)=>result.json());

    if(weatherResult){
        displayWeather(weatherResult,oneCallResult);
    }else{
        document.querySelector('#todayWeather').innerHTML=`<h1>Please try again</h1>`;

    }
}

function displayWeather(currentData, oneCallData){
    locationEl.textContent=`City: ${currentData.name}`
    temperatureEl.textContent=`Temperature: ${currentData.main.temp}`;
    windSpeedEl.textContent=`wind speed: ${currentData.wind.speed}`;
    humidityEl.textContent=`Humidity: ${currentData.main.humidity}`;
    UVEl.textContent=`UV index: ${oneCallData.current.uvi}`;
    // let Date= moment().add(1,'days').format('M/D/YYYY');
    // forecastDateEl.textContent=`${Date}`;
    // forecastTempEl.textContent=`Temperature:${currentData.main.temp}`;
    // forecastHumEl.textContent=`Humidity:${currentData.main.humidity}`;

    searchHistory.push(`${currentData.name}`);
    localStorage.searchHistory = JSON.stringify(searchHistory);
    historyFun();
    // forecastData.list.forEach(displayForecast);

}

// function displayForecast(item){
// let Date= moment().add(1,'days').format('M/D/YYYY');
// document.querySelector('#forecast').innerHTML+=

// }

function clearHistory(){
    localStorage.clear();
    historyEl.innerHTML='';
}


function historyFun(){
    historyEl.innerHTML='';
    searchHistory.forEach(function(item){
        historyEl.innerHTML += `<li class="list-group-item" onclick="fetchWeather( '${item}' )">${item}</li>`
    })
}
