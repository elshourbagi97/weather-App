let button = document.querySelector('.button');
let inputSearch = document.getElementById('location');
let outputlocation = document.querySelector('.location');
let degree = document.querySelector('.degree');
let desc = document.querySelector('.desc');
let cloudy = document.getElementById('cloudy');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
const cloud = document.getElementById('cloud');
const windy = document.getElementById('windy');
const hum = document.getElementById('hum');
const weatherDetails = document.getElementById('weatherDetails')
const line = document.getElementById('line')
const time = document.getElementById('time')

button.addEventListener('click',function(e){
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=668449caddebe7550910131f37b7ebbb&units=metric`)
    .then(response=>response.json())
    .then(displayData)
    .catch(err=>{alert('wrong Country or City here')
                    inputSearch.style.border='3px solid red';
                    inputSearch.value=''})
})


const displayData = function(weatherData){
    const condition = weatherData.weather[0].main;
    document.querySelector('body').style.backgroundImage = getBackGroundImage(condition)
    degree.innerHTML = `${weatherData.main.temp}°c`;
    outputlocation.innerHTML = inputSearch.value ;
    desc.innerHTML = weatherData.weather[0].main;
    updateTime(weatherData.timezone)
    line.style.display='block'
    weatherDetails.style.display='block'
    cloud.style.display='block'
    cloudy.innerHTML = `${weatherData.clouds.all}%`
    hum.style.display='block'
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windy.style.display='block'
    wind.innerHTML = `${parseInt(weatherData.wind.speed) * 3.6} km/h`



    // const iconCode = weatherData.weather[0].icon;
    // const iconImage = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    // const image = document.createElement('img');
    // image.src=iconImage
    // desc.appendChild(image);
    // console.log("Icon URL:", iconImage);
}



//  get location from the user ::

const findMyLocation = function(){
    const correct = function(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=668449caddebe7550910131f37b7ebbb&units=metric`)
        .then(res=>res.json())
        .then(myLocationData)
        .catch(er=>alert('There is an Error Your Location'))
    }
    navigator.geolocation.getCurrentPosition(correct);
}

const myLocation = document.getElementById('myLocation');
myLocation.addEventListener('click',findMyLocation)


const myLocationData= function(locationData){
    const condition = locationData.weather[0].main;
    document.querySelector('body').style.backgroundImage = getBackGroundImage(condition)
    line.style.display='block'
    weatherDetails.style.display='block'
    cloud.style.display='block'
    hum.style.display='block'
    windy.style.display='block'
    degree.innerHTML = `${locationData.main.temp}°c`;
    desc.innerHTML = locationData.weather[0].main;
    cloudy.innerHTML = `${locationData.clouds.all}%`
    humidity.innerHTML = `${locationData.main.humidity}%`;
    wind.innerHTML = `${parseInt(locationData.wind.speed) * 3.6} km/h`
    outputlocation.innerHTML = locationData.name;
    inputSearch.value = locationData.name
    updateTime(locationData.timezone)

}

//  background Image :
function getBackGroundImage(condition){
    let lowercaseCondition= condition.toLowerCase();
switch(lowercaseCondition){
    case "clear":
        document.querySelector('body').style.color = "rgb(11, 11, 48)";
        return "url(https://images.pexels.com/photos/754419/pexels-photo-754419.jpeg?cs=srgb&dl=altitude-clear-sky-clouds-754419.jpg&fm=jpg)";
    case "clouds":
        document.querySelector('body').style.color = "white";
        document.getElementById('myLocation').style.color='white'
        document.getElementById('location').style.color='white'
        return "url(https://images.pexels.com/photos/846980/pexels-photo-846980.jpeg?cs=srgb&dl=clouds-cloudy-countryside-846980.jpg&fm=jpg)";
    case "rain": 
            document.querySelector('body').style.color = "white";
            document.getElementById('myLocation').style.color='white'
            document.getElementById('location').style.color='white'
        return "url(https://wallpapers.com/images/hd/beautiful-rain-pouring-on-the-road-e1f4fezsrrut5h10.jpg)";
    case "thunderstorm":
        return "url(http://www.pixelstalk.net/wp-content/uploads/2016/03/Lightning-storm-with-rain-wallpaper.jpg)";
    case "mist":
            document.querySelector('body').style.color = "rgb(11, 11, 48)";
            return "url(https://wallpapercave.com/wp/wp4155374.jpg)";
    case "snow":
        document.querySelector('body').style.color = "rgb(11, 11, 48)";
        return "url(https://s.abcnews.com/images/US/blizzard-mountains-gty-jt-190927_hpMain_16x9_992.jpg)" ;
    case "drizzle":
        return "url(http://images.unsplash.com/photo-1556485689-33e55ab56127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8ZHJpenpsZXx8MHx8fHwxNjI1MzY0NDk3&ixlib=rb-1.2.1&q=80&w=1080)"        
    default: 
        return "url(Untitled\ design.png)"
}
}

//  time function
const updateTime = function (timezoneOffset) {
    const localDate = new Date();
    
   
    const utc = localDate.getTime() + localDate.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + timezoneOffset * 1000);

    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedTime = localTime.toLocaleString('en-US', options);

   
    time.innerHTML = formattedTime;
};