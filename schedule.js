const mykey = config.mykey;
let urlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" 
let weekInfo = document.getElementById('weekData');
let cityId = document.getElementById('city')

async function insertHTML (datahere) {
    let info = document.getElementById("input");
    info.innerHTML = `<img src = "http://openweathermap.org/img/wn/${datahere.weather[0].icon}@2x.png" alt = "icon of the weather">
     The weather for ${datahere.name} at this hour currently has ${datahere.weather[0].description}</p>`
};

getData = async (city) => {
    const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`)
    console.log(url)
    if (url.status === 200){
    let data = await url.json();
    console.log(`Is this our workable data?`, data);
    insertHTML(data);
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    get7dayWeather(lat,lon)
    return data
    }else{
        alert(data.status)
    }
};

get7dayWeather = async (lat, lon) => {
    const apiCall = await fetch(`${urlOneCall}${lat}&lon=${lon}&appid=${mykey}&exclude=minutely,hourly&units=imperial`)
    if (apiCall.status = 200){
        let data = await apiCall.json();
        console.log("did we get the 7 day forcast information? ", data)
        insertWeekHtml(data);
        return data
    }else{
        alert(result.status)
    }
}
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function insertWeekHtml (weekdata){
    let tableHeader = document.getElementById('tableHeader')
    tableHeader.innerHTML = `<th>Day</th><th>Icon</th><th>Weather Description</th><th>Maximum Temperature</th><th>Minumum Temperature</th>`
    let newTR;
    var tableBody = document.getElementById("tableBody")
        for(let i = 0; i <weekdata.daily.length; i++){
            newTR = document.createElement('tr');
            let date = new Date (weekdata.daily[i].dt * 1000);
            let whatDay = date.getDay()
            console.log(whatDay)
            newTR.innerHTML =  `<td>${daysOfWeek[whatDay]}</td><td><img src = "http://openweathermap.org/img/wn/${weekdata.daily[i].weather[0].icon}.png"></td><td>${weekdata.daily[i].weather[0].main}</td><td>${weekdata.daily[i].temp.max}&#x2109</td><td>${weekdata.daily[i].temp.min}&#x2109</td>`
            tableBody.appendChild(newTR);
        }
    }

const button = document.getElementById("search");

button.addEventListener("click", () =>{
    let userCity = cityId.value.toLowerCase()
    console.log("what is the user city?", userCity);
    getData(userCity);

});

