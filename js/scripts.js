import { saveToLocalStorageByName, GetLocalStorage, RemoveFromLocalStorage, favorites } from "./localStorage.js";

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

let lowDayOne = document.getElementById("lowDayOne");
let lowDayTwo = document.getElementById("lowDayTwo");
let lowDayThree = document.getElementById("lowDayThree");
let lowDayFour = document.getElementById("lowDayFour");
let lowDayFive = document.getElementById("lowDayFive");

let highDayOne = document.getElementById("highDayOne");
let highDayTwo = document.getElementById("highDayTwo");
let highDayThree = document.getElementById("highDayThree");
let highDayFour = document.getElementById("highDayFour");
let highDayFive = document.getElementById("highDayFive");

let dayOneIcon = document.getElementById("dayOneIcon");
let dayTwoIcon = document.getElementById("dayTwoIcon");
let dayThreeIcon = document.getElementById("dayThreeIcon");
let dayFourIcon = document.getElementById("dayFourIcon");
let dayFiveIcon = document.getElementById("dayFiveIcon");

let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let weatherOne = document.getElementById("weatherOne");
let weatherTwo = document.getElementById("weatherTwo");

let dayOneId = document.getElementById("dayOneId");
let dayTwoId = document.getElementById("dayTwoId");
let dayThreeId = document.getElementById("dayThreeId");
let dayFourId = document.getElementById("dayFourId");
let dayFiveId = document.getElementById("dayFiveId");

let favoriteAddRemove = document.getElementById("favoriteAddRemove");
let favoriteRow = document.getElementById("favoriteRow");

let latitude = "";
let longitude = "";
let asyncPokeApi;
let asyncPokeApi2;
let asyncPokeApi3;

let tempNumber = "";
let arr = [];

searchRow2.style.display = "none";
favoriteRow.style.display = "none";

favoritesToggle.addEventListener("click", function(){
    searchRow.style.display = "none";
    currentWeatherRow.style.display = "none";
    fiveDayForecast.style.display = "none";
    searchRow2.style.display = "flex";
    favoriteRow.style.display = "flex";
})

favoritesToggle2.addEventListener("click", function(){
    searchRow.style.display = "flex";
    currentWeatherRow.style.display = "flex";
    fiveDayForecast.style.display = "flex";
    searchRow2.style.display = "none";
    favoriteRow.style.display = "none";
})

searchClick.addEventListener("click", function(){
    let searchText = searchInput.value;
    console.log(searchText);

    let urlName = "http://api.openweathermap.org/geo/1.0/direct?q="+ searchText +"&limit=5&appid=a8dee87c18a78757d839fe472c22cfad&units=imperial";

    asyncGetData(urlName);

})

favoriteAddRemove.addEventListener("click", function(){
    // === asyncPokeApi[0].name +", "+ asyncPokeApi[0].state
    // cityNameText.textContent

    addAndRemoveFav(cityNameText.textContent);

})

// function urlCall(url) {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             dataBack = data;
//         });
// }

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
    else if(weatherIcon === 'Haze')
    {
        degreeIcon.className = "hazeDay";
    }
    else if(weatherIcon === 'Drizzle')
    {
        degreeIcon.className = "drizzleDay";
    }
    else if(weatherIcon === 'Thunderstorm')
    {
        degreeIcon.className = "thunderstormDay";
    }
    
    // console.log(asyncPokeApi.abilities[1].ability.name);

    // info1.innerHTML = asyncPokeApi.name;
    // info2.innerHTML = asyncPokeApi.moves[9].move.name;
    // info3.innerHTML = asyncPokeApi.moves[39].move.name;
    let minTempVar = asyncPokeApi2.main.temp_min;
    minTemp.innerHTML = Math.floor(minTempVar) + "°";

    let maxTempVar = asyncPokeApi2.main.temp_max;
    maxTemp.innerHTML = Math.floor(maxTempVar) + "°";

    let minStatus = asyncPokeApi2.weather[0].main;
    GetWeatherIcon2(minStatus,weatherOne);

    let maxStatus = asyncPokeApi2.weather[0].main;
    GetWeatherIcon2(maxStatus,weatherTwo);

    GetDayOfWeek();

    GetFiveDay();
}

async function asyncGetDataFiveDay(url){
    const promise = await fetch(url);
    console.log(promise);
    const data = await promise.json();

    asyncPokeApi3 = data;

    console.log(asyncPokeApi3);

    arr.push(asyncPokeApi3.list[0].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[1].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[2].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[3].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[4].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[5].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[6].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[7].main.temp_min);
    // console.log(arr);

    var min = Math.min.apply(Math, arr)
    // console.log(min)
    let displayMin = Math.floor(min);

    lowDayOne.innerHTML = "L: "+ displayMin + "°";

    let tempDay = asyncPokeApi3.list[5].main.temp;
    highDayOne.innerHTML = Math.floor(tempDay) + "°";
    let dayOneStatus = asyncPokeApi3.list[5].weather[0].main;

    GetWeatherIcon(dayOneStatus,dayOneIcon);

    arr = [];

    arr.push(asyncPokeApi3.list[8].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[9].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[10].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[11].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[12].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[13].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[14].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[15].main.temp_min);
    // console.log(arr);

    var min2 = Math.min.apply(Math, arr)
    // console.log(min2)
    let displayMin2 = Math.floor(min2);

    lowDayTwo.innerHTML = "L: "+ displayMin2 + "°";

    let tempDay2 = asyncPokeApi3.list[13].main.temp;
    highDayTwo.innerHTML = Math.floor(tempDay2) + "°";
    let dayTwoStatus = asyncPokeApi3.list[13].weather[0].main;

    GetWeatherIcon(dayTwoStatus,dayTwoIcon);

    arr = [];

    arr.push(asyncPokeApi3.list[16].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[17].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[18].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[19].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[20].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[21].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[22].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[23].main.temp_min);
    // console.log(arr);

    var min3 = Math.min.apply(Math, arr)
    // console.log(min3)
    let displayMin3 = Math.floor(min3);

    lowDayThree.innerHTML = "L: "+ displayMin3 + "°";

    let tempDay3 = asyncPokeApi3.list[21].main.temp;
    highDayThree.innerHTML = Math.floor(tempDay3) + "°";
    let dayThreeStatus = asyncPokeApi3.list[21].weather[0].main;

    GetWeatherIcon(dayThreeStatus,dayThreeIcon);

    arr = [];

    arr.push(asyncPokeApi3.list[24].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[25].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[26].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[27].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[28].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[29].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[30].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[31].main.temp_min);
    // console.log(arr);

    var min4 = Math.min.apply(Math, arr)
    // console.log(min4)
    let displayMin4 = Math.floor(min4);

    lowDayFour.innerHTML = "L: "+ displayMin4 + "°";

    let tempDay4 = asyncPokeApi3.list[29].main.temp;
    highDayFour.innerHTML = Math.floor(tempDay4) + "°";
    let dayFourStatus = asyncPokeApi3.list[29].weather[0].main;

    GetWeatherIcon(dayFourStatus,dayFourIcon);

    arr = [];

    arr.push(asyncPokeApi3.list[32].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[33].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[34].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[35].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[36].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[37].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[38].main.temp_min);
    // console.log(arr);

    arr.push(asyncPokeApi3.list[39].main.temp_min);
    // console.log(arr);

    var min5 = Math.min.apply(Math, arr)
    // console.log(min5)
    let displayMin5 = Math.floor(min5);

    lowDayFive.innerHTML = "L: "+ displayMin5 + "°";

    let tempDay5 = asyncPokeApi3.list[37].main.temp;
    highDayFive.innerHTML = Math.floor(tempDay5) + "°";
    let dayFiveStatus = asyncPokeApi3.list[37].weather[0].main;

    GetWeatherIcon(dayFiveStatus,dayFiveIcon);

    arr = [];

}

function GetLatAndLong(){
    // console.log(latitude);
    let urlName2 = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&appid=a8dee87c18a78757d839fe472c22cfad&units=imperial";

    asyncGetData2(urlName2);
}

function GetFiveDay(){
    let urlName3 = "https://api.openweathermap.org/data/2.5/forecast?lat="+ latitude +"&lon="+ longitude +"&appid=a8dee87c18a78757d839fe472c22cfad&units=imperial";

    

    asyncGetDataFiveDay(urlName3);
}

function GetWeatherIcon(status,dayWise){
    console.log(status);
    if(status === 'Clear')
    {
        dayWise.className = "clearDayStatus";
    }
    else if(status === 'Clouds')
    {
        dayWise.className = "cloudDayStatus";
    }
    else if(status === 'Snow')
    {
        dayWise.className = "snowDayStatus";
    }
    else if(status=== 'Rain')
    {
        dayWise.className = "rainDayStatus";
    }
    else if(status === 'Haze')
    {
        dayWise.className = "hazeDayStatus";
    }
    else if(status=== 'Drizzle')
    {
        dayWise.className = "drizzleDayStatus";
    }
    else if(status === 'Thunderstorm')
    {
        dayWise.className = "thunderstormDayStatus";
    } 
}

function GetWeatherIcon2(status,dayWise){
    console.log(status);
    if(status === 'Clear')
    {
        dayWise.className = "clearDayStatus2";
    }
    else if(status === 'Clouds')
    {
        dayWise.className = "cloudDayStatus2";
    }
    else if(status === 'Snow')
    {
        dayWise.className = "snowDayStatus2";
    }
    else if(status=== 'Rain')
    {
        dayWise.className = "rainDayStatus2";
    }
    else if(status === 'Haze')
    {
        dayWise.className = "hazeDayStatus2";
    }
    else if(status=== 'Drizzle')
    {
        dayWise.className = "drizzleDayStatus2";
    }
    else if(status === 'Thunderstorm')
    {
        dayWise.className = "thunderstormDayStatus2";
    } 
}

function GetDayOfWeek(){
    const d = new Date();
    let day = d.getDay();
    console.log(day);

    switch(day)
    {
        case 0:
            dayOneId.innerHTML = "MON";
            dayTwoId.innerHTML = "TUE";
            dayThreeId.innerHTML = "WED";
            dayFourId.innerHTML = "THU";
            dayFiveId.innerHTML = "FRI";
        break;

        case 1:
            dayOneId.innerHTML = "TUE";
            dayTwoId.innerHTML = "WED";
            dayThreeId.innerHTML = "THU";
            dayFourId.innerHTML = "FRI";
            dayFiveId.innerHTML = "SAT";
        break;

        case 2:
            dayOneId.innerHTML = "WED";
            dayTwoId.innerHTML = "THU";
            dayThreeId.innerHTML = "FRI";
            dayFourId.innerHTML = "SAT";
            dayFiveId.innerHTML = "SUN";
        break;

        case 3:
            dayOneId.innerHTML = "THU";
            dayTwoId.innerHTML = "FRI";
            dayThreeId.innerHTML = "SAT";
            dayFourId.innerHTML = "SUN";
            dayFiveId.innerHTML = "MON";
        break;

        case 4:
            dayOneId.innerHTML = "FRI";
            dayTwoId.innerHTML = "SAT";
            dayThreeId.innerHTML = "SUN";
            dayFourId.innerHTML = "MON";
            dayFiveId.innerHTML = "TUE";
        break;

        case 5:
            dayOneId.innerHTML = "SAT";
            dayTwoId.innerHTML = "SUN";
            dayThreeId.innerHTML = "MON";
            dayFourId.innerHTML = "TUE";
            dayFiveId.innerHTML = "WED";
        break;

        case 6:
            dayOneId.innerHTML = "SUN";
            dayTwoId.innerHTML = "MON";
            dayThreeId.innerHTML = "TUE";
            dayFourId.innerHTML = "WED";
            dayFiveId.innerHTML = "THU";
        break;


    }
}

function addAndRemoveFav(textPassed){

    GetLocalStorage();
    console.log(textPassed);

    if (favorites.includes(textPassed))
    {
        RemoveFromLocalStorage(textPassed);
    }
    else
    {
        saveToLocalStorageByName(textPassed);
    }
}

function CreateElements(){
    let favorites = GetLocalStorage();

    // for(let i = 0; i<favorites.length; i++)
    // {
        favorites.map(person => {
            let p = document.createElement('p');
            p.textContent = person;
    
            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.textContent = 'Delete';
            deleteBtn.type = 'button';
            deleteBtn.addEventListener("click", function(){
                RemoveFromLocalStorage(person);
            })
    
            favoriteRow.appendChild(p);
            favoriteRow.appendChild(deleteBtn);
        })
    
    // }


}

GetLocalStorage();
CreateElements();