let favoritesToggle = document.getElementById("favoritesToggle");
let favoritesToggle2 = document.getElementById("favoritesToggle2");
let searchRow = document.getElementById("searchRow");
let searchRow2 = document.getElementById("searchRow2");
let currentWeatherRow = document.getElementById("currentWeatherRow");
let fiveDayForecast = document.getElementById("fiveDayForecast");

let searchInput = document.getElementById("searchInput");
let searchClick = document.getElementById("searchClick");

let degreeTextId = document.getElementById("degreeTextId");
let cityNameText = document.getElementById("cityNameText");
let weatherDayId = document.getElementById("weatherDayId");
let degreeIcon = document.getElementById("degreeIcon");

let latitude = "";
let longitude = "";
let asyncPokeApi;
let asyncPokeApi2;

let tempNumber = "";

searchRow2.style.display = "none";

favoritesToggle.addEventListener("click", function(){
    searchRow.style.display = "none";
    currentWeatherRow.style.display = "none";
    fiveDayForecast.style.display = "none";
    searchRow2.style.display = "flex";
})

favoritesToggle2.addEventListener("click", function(){
    searchRow.style.display = "flex";
    currentWeatherRow.style.display = "flex";
    fiveDayForecast.style.display = "flex";
    searchRow2.style.display = "none";
})

searchClick.addEventListener("click", function(){
    let searchText = searchInput.value;
    console.log(searchText);

    let urlName = "http://api.openweathermap.org/geo/1.0/direct?q="+ searchText +"&limit=5&appid=a8dee87c18a78757d839fe472c22cfad&units=imperial";

    asyncGetData(urlName);

})

function urlCall(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dataBack = data;
        });
}

async function asyncGetData(url){
    const promise = await fetch(url);
    const data = await promise.json();

    asyncPokeApi = data;

    console.log(asyncPokeApi);

    latitude = asyncPokeApi[0].lat;
    console.log(latitude);

    longitude = asyncPokeApi[0].lon;
    console.log(longitude);

    cityNameText.innerHTML = asyncPokeApi[0].name;
    cityNameText.innerHTML += ", "+ asyncPokeApi[0].state;

    GetLatAndLong();
    // console.log(asyncPokeApi.abilities[1].ability.name);

    // info1.innerHTML = asyncPokeApi.name;
    // info2.innerHTML = asyncPokeApi.moves[9].move.name;
    // info3.innerHTML = asyncPokeApi.moves[39].move.name;
}

async function asyncGetData2(url){
    const promise = await fetch(url);
    const data = await promise.json();

    asyncPokeApi2 = data;

    console.log(asyncPokeApi2);

    console.log(asyncPokeApi2.weather[0].icon);

    tempNumber = asyncPokeApi2.main.temp;
    degreeTextId.innerHTML = Math.floor(tempNumber);
    console.log(asyncPokeApi2.main);

    weatherDayId.innerHTML = asyncPokeApi2.weather[0].main;

    let weatherIcon = asyncPokeApi2.weather[0].main;


    console.log(weatherIcon);
    if(weatherIcon === 'Clear')
    {
        degreeIcon.className = "clearDay";
    }
    else if(weatherIcon === 'Clouds')
    {
        degreeIcon.className = "cloudDay";
    }
    else if(weatherIcon === 'Snow')
    {
        degreeIcon.className = "snowDay";
    }
    else if(weatherIcon === 'Rain')
    {
        degreeIcon.className = "rainDay";
    }
    else if(weatherIcon == 'Haze')
    {
        degreeIcon.className = "hazeDay";
    }
    
    // console.log(asyncPokeApi.abilities[1].ability.name);

    // info1.innerHTML = asyncPokeApi.name;
    // info2.innerHTML = asyncPokeApi.moves[9].move.name;
    // info3.innerHTML = asyncPokeApi.moves[39].move.name;
}

function GetLatAndLong(){
    console.log(latitude);
    let urlName2 = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&appid=a8dee87c18a78757d839fe472c22cfad&units=imperial";

    asyncGetData2(urlName2);
}