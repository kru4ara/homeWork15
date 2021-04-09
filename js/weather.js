const key = '27924562d312c22957560d17bdaaceda'
let city = 'Kobrin'

function buildTime() {
  const date = new Date()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const timeNow = `${hours}:${minutes}`
  return timeNow
}

function windDirection(d) {
  const directions = ['Northerly', 'North Easterly', 'Easterly', 'South Easterly', 'Southerly', 'South Westerly', 'Westerly', 'North Westerly'];
  d = d < 0 ? d = 360 - Math.abs(d) % 360 : d % 360;
  return `${directions[d / 45 | 0]}`
}

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
  .then(function (response) { return response.json() })
  .then(function (data) {
    console.log(data);
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.country').textContent = ', ' + data.sys.country;
    document.querySelector('.time').innerHTML = `<svg width="1em" height="1em"><use xlink:href="#watch"></use></svg><p>${buildTime()}</p>`;
    document.querySelector('.temp').innerHTML = `<p>${Math.round(data.main.temp - 273)}&deg;C</p>`;
    document.querySelector('.temp-feels-like').innerHTML = `Feels like ${Math.round(data.main.feels_like - 273)}&deg;C`;
    document.querySelector('.icon-weather').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}.png">`;
    document.querySelector('.wind-direct').innerHTML = `<svg width="1em" height="1em"><use xlink:href="#compas"></use></svg><p>${windDirection(data.wind.deg)}</p>`;
    document.querySelector('.wind-speed').innerHTML = `<svg width="1em" height="1em"><use xlink:href="#wind"></use></svg><p>${data.wind.speed} m/s</p>`;

  })
  .catch(function (error) {
    console.log(error)
  })

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`)
  .then(function (response) { return response.json() })
  .then(function (data) {
    console.log(data);
    document.querySelector('.day-1').innerHTML = `
    <p>${data.list[0].dt_txt}</p>
    <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0]['icon']}.png">
    <p>${Math.round(data.list[0].main.temp - 273)}&deg;C</p>
    `;
    document.querySelector('.day-2').innerHTML = `
    <p>${data.list[8].dt_txt}</p>
    <img src="http://openweathermap.org/img/wn/${data.list[8].weather[0]['icon']}.png">
    <p>${Math.round(data.list[8].main.temp - 273)}&deg;C</p>
    `;
    document.querySelector('.day-3').innerHTML = `
    <p>${data.list[16].dt_txt}</p>
    <img src="http://openweathermap.org/img/wn/${data.list[16].weather[0]['icon']}.png">
    <p>${Math.round(data.list[16].main.temp - 273)}&deg;C</p>
    `;
    document.querySelector('.day-4').innerHTML = `
    <p>${data.list[24].dt_txt}</p>
    <img src="http://openweathermap.org/img/wn/${data.list[24].weather[0]['icon']}.png">
    <p>${Math.round(data.list[24].main.temp - 273)}&deg;C</p>
    `;
    document.querySelector('.day-5').innerHTML = `
    <p>${data.list[32].dt_txt}</p>
    <img src="http://openweathermap.org/img/wn/${data.list[32].weather[0]['icon']}.png">
    <p>${Math.round(data.list[32].main.temp - 273)}&deg;C</p>
    `;
  })
  .catch(function (error) {
    console.log(error)
  })