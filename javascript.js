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
  
    return cityName;
}

async function fetchWeather(cityName){
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5534726c08a3a7f6f9639cde7b366630`;
    const weatherResult= await fetch(api).then((result)=>result.json());

    let apiOneCall= `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherResult.coord.lat}&lon=${weatherResult.coord.lon}&exclude=hourly,daily&appid=5534726c08a3a7f6f9639cde7b366630`
    const oneCallResult= await fetch(apiOneCall).then((result)=>result.json());

    let apiForecast=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=5534726c08a3a7f6f9639cde7b366630`;
    const apiForecastResult= await fetch(apiForecast).then((result)=>result.json());
debugger
    
    if(weatherResult){
        displayWeather(weatherResult,oneCallResult,apiForecastResult);
    }else{
        document.querySelector('#todayWeather').innerHTML=`<h1>Please try again</h1>`;

    }
}

const forecastDate1El= document.querySelector('#forecastDate1');
const forecastDate2El= document.querySelector('#forecastDate2');
const forecastDate3El= document.querySelector('#forecastDate3');
const forecastDate4El= document.querySelector('#forecastDate4');
const forecastDate5El= document.querySelector('#forecastDate5');

const forecastTemp1El= document.querySelector('#forecastTemp1');
const forecastTemp2El= document.querySelector('#forecastTemp2');
const forecastTemp3El= document.querySelector('#forecastTemp3');
const forecastTemp4El= document.querySelector('#forecastTemp4');
const forecastTemp5El= document.querySelector('#forecastTemp5');

const forecastHum1El= document.querySelector('#forecastHum1');
const forecastHum2El= document.querySelector('#forecastHum2');
const forecastHum3El= document.querySelector('#forecastHum3');
const forecastHum4El= document.querySelector('#forecastHum4');
const forecastHum5El= document.querySelector('#forecastHum5');



function displayWeather(currentData, oneCallData,ForecastData){
    var tempNumCurrent= currentData.main.temp - 273.15;
    var tempNumberCurrent=Number(tempNumCurrent).toFixed(1);

    var tempNumforecast1= ForecastData.list[6].main.temp - 273.15;
    var tempNumberforecast1=Number(tempNumforecast1).toFixed(1);

    var tempNumforecast2= ForecastData.list[14].main.temp - 273.15;
    var tempNumberforecast2=Number(tempNumforecast2).toFixed(1);

    var tempNumforecast3= ForecastData.list[22].main.temp - 273.15;
    var tempNumberforecast3=Number(tempNumforecast3).toFixed(1);

    var tempNumforecast4= ForecastData.list[30].main.temp - 273.15;
    var tempNumberforecast4=Number(tempNumforecast4).toFixed(1);

    var tempNumforecast5= ForecastData.list[38].main.temp - 273.15;
    var tempNumberforecast5=Number(tempNumforecast5).toFixed(1);


    
    locationEl.textContent=`City: ${currentData.name}`;
    temperatureEl.textContent=`Temperature: ${tempNumberCurrent}`;
    windSpeedEl.textContent=`wind speed: ${currentData.wind.speed}`;
    humidityEl.textContent=`Humidity: ${currentData.main.humidity}`;
    UVEl.textContent=`UV index: ${oneCallData.current.uvi}`;

    forecastDate1El.textContent=`Date: ${ForecastData.list[6].dt_txt}`;
    forecastDate2El.textContent=`Date: ${ForecastData.list[14].dt_txt}`;
    forecastDate3El.textContent=`Date: ${ForecastData.list[22].dt_txt}`;
    forecastDate4El.textContent=`Date: ${ForecastData.list[30].dt_txt}`;
    forecastDate5El.textContent=`Date: ${ForecastData.list[38].dt_txt}`;

    forecastTemp1El.textContent=`Temperature: ${tempNumberforecast1}`;
    forecastTemp2El.textContent=`Temperature: ${tempNumberforecast2}`;
    forecastTemp3El.textContent=`Temperature: ${tempNumberforecast3}`;
    forecastTemp4El.textContent=`Temperature: ${tempNumberforecast4}`;
    forecastTemp5El.textContent=`Temperature: ${tempNumberforecast5}`;

    forecastHum1El.textContent=`humidity: ${ForecastData.list[6].main.humidity}`;
    forecastHum2El.textContent=`humidity: ${ForecastData.list[14].main.humidity}`;
    forecastHum3El.textContent=`humidity: ${ForecastData.list[22].main.humidity}`;
    forecastHum4El.textContent=`humidity: ${ForecastData.list[30].main.humidity}`;
    forecastHum5El.textContent=`humidity: ${ForecastData.list[38].main.humidity}`;

   
    searchHistory.push(`${currentData.name}`);
    localStorage.searchHistory = JSON.stringify(searchHistory);
    historyFun();
  

}



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
