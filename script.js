const apiKey = 'ffc02d5fcd3e0538ed7f3664ab7edfc3';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const output = document.getElementById('weatherResult');

  if (city === '') {
    output.innerHTML = "⚠ Please enter a city name.";
    output.style.display = 'block';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('City not found');
      }
      return res.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      output.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
      `;
      output.style.display = 'block';
    })
    .catch(err => {
      output.innerHTML = `${err.message}`;
      output.style.display = 'block';
    });
}