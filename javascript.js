

// // async
//  function seachCity(){
//     event.preventDefault;
//     console.log('searchBtn works');
//     var cityName= document.querySelector('#searchInput').value;
//     console.log(cityName);
//     // document.querySelector('#cityNameResult').innerHTML= cityName;
    
//     //try  try{
//     // const AmazonData = await fetchAmazonData( consoleName );
//     // const GoogleData = await fetchGoogleData( consoleName );
//     // //Display product info
//     // displayProduct( AmazonData, GoogleData );
//     // } catch( e ){
//     //     console.log( `Fetching failed`, e )
//     // }
    
// }
// var api='https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5534726c08a3a7f6f9639cde7b366630';

// async function fetchWeatherData(api){
//     console.log('fetch the weather');
//     var result= await fetch(api).then(result=>result.json());

//     result.forEach(function(cityInfor){
//         document.querySelector('#todayWeather').innerHTML=' <ul id="todayWeather" class="list-group">
//         <h1 id="cityNameResult" class="list-group-item"></h1>
//         <li class="list-group-item">conditionsTORONTO</li>
//         <li class="list-group-item">temperature</li>
//         <li class="list-group-item">humidity</li>
//         <li class="list-group-item">wind speed</li>
//         <li class="list-group-item">UV index</li>
//       </ul>'
    
        
//     });

// }



// function displayWeather








// async function fetchWeather(cityName){

//     var api='https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5534726c08a3a7f6f9639cde7b366630';
  

// const weatherResult = await fetch(queryURL).then((result)=>result.json());
// console.log(`weatherresult`,weatherResult);
// // if(weatherResult){
// //     displayWeather(weatherResult);
// // }
// };

// function displayWeather(currentData){
//     console.log(currentData);
    

// }

var time = new Date();
document.getElementById("timeshown").innerHTML = time;

const locationEl=document.querySelector('#location');
const temperatureEl=document.querySelector('#temperature');
const humidityEl=document.querySelector('#humidity');
const windSpeedEl=document.querySelector('#windSpeed');
const UVEl=document.querySelector('#UV');

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

}
