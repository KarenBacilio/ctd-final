const mykey = config.mykey;
let urlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" 
let weekTable = document.getElementById('weekData');
let cityId = document.getElementById('city')

async function insertHTML (datahere) {
    let info = document.getElementById("theirCity");
    info.innerHTML = `<img src = "http://openweathermap.org/img/wn/${datahere.weather[0].icon}@2x.png" alt = "icon of the weather">
     The weather for ${datahere.name} at this hour currently has ${datahere.weather[0].description}`
};

getData = async (city) => {
    try{
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
    }catch(error){
        alert(error.message)
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
let annoucement = document.getElementById("inclementAnnouncement");

async function insertWeekHtml (weekdata){
    weekTable.innerHTML = `<thead><tr><th>Day</th><th>Icon</th><th>Weather Description</th><th>Maximum Temperature</th><th>Minumum Temperature</th></tr></thead>`;
    weekTable.innerHTML += `<tbody>`;
    let badWeather = [202, 211, 212, 501, 502, 503, 504, 601, 611, 613, 616, 622]
    let ifBadWeather;
        for(let i = 0; i <weekdata.daily.length; i++){
            let date = new Date (weekdata.daily[i].dt * 1000);
            let whatDay = date.getDay()
            weekTable.innerHTML +=  `<tr><td>${daysOfWeek[whatDay]}</td><td><img src = "http://openweathermap.org/img/wn/${weekdata.daily[i].weather[0].icon}.png"></td><td>${weekdata.daily[i].weather[0].main}</td><td>${weekdata.daily[i].temp.max}&#x2109</td><td>${weekdata.daily[i].temp.min}&#x2109</td></tr>`;
            ifBadWeather = weekdata.daily[i].weather[0].id;
            if(badWeather.includes(ifBadWeather)){
                annoucement.innerHTML += `<p>**Clients who are scheduled for ${daysOfWeek[whatDay]} might have to be rescheduled due to weather.**</p>`
            }else{
                console.log(`Looks like we got great weather for ${daysOfWeek[whatDay]}`)
            }
        }
        weekTable.innerHTML += `</tbody>`;

    }

const button = document.getElementById("search");

button.addEventListener("click", () =>{
    let userCity = cityId.value.toLowerCase()
    if(userCity == ""){
        alert("Oops, it seems you forgot to type in a City name, please try again");
    }
    console.log("what is the user city?", userCity);
    getData(userCity);

});

