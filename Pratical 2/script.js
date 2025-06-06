// Configuration and Constants
const WEATHER_API_KEY = 'e6ff59cbb3d13f6a699492df2e1b25a0'; // Replace with your API key
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const PLACEHOLDER_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Global state to store saved locations
let savedLocations = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Tab navigation
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // GET Request - Weather data
    document.getElementById('get-weather').addEventListener('click', getWeather);

    // POST Request - Save location
    document.getElementById('save-location').addEventListener('click', saveLocation);

    // Edit Modal Event Listeners
    document.getElementById('update-location').addEventListener('click', updateLocation);
    document.getElementById('cancel-edit').addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });

    // Load initial saved locations
    fetchSavedLocations();
});

// Utility Functions
function displayResponseInfo(method, url, status, data) {
    const responseInfo = document.getElementById('response-info');
    responseInfo.textContent = `Method: ${method}\nURL: ${url}\nStatus: ${status}\nTimestamp: ${new Date().toLocaleString()}\n\nData: ${JSON.stringify(data, null, 2)}`;
}

// GET Request Implementation
async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = 'Loading...';

    try {
        const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        displayResponseInfo('GET', url.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'), response.status, data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }

        weatherResult.innerHTML = `
            <div class="weather-card">
                <h3>${data.name}, ${data.sys.country}</h3>
                <div><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</div>
                <div><strong>Temperature:</strong> ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)</div>
                <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
                <div><strong>Wind:</strong> ${data.wind.speed} m/s</div>
                <button id="quick-save" style="background-color: #27ae60;">Save This Location</button>
            </div>
        `;

        document.getElementById('quick-save').addEventListener('click', () => {
            document.getElementById('location-name').value = `Weather in ${data.name}`;
            document.getElementById('location-city').value = data.name;
            document.getElementById('location-country').value = data.sys.country;
            document.getElementById('location-notes').value = `Temp: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;

            document.querySelector('.tab[data-tab="post"]').click();
        });

    } catch (error) {
        weatherResult.innerHTML = `<div class="weather-card" style="border-left-color: #e74c3c;">
            <h3>Error</h3>
            <p>${error.message}</p>
        </div>`;
    }
}

// DELETE Request Implementation
async function deleteLocation(id) {
    if (!confirm('Are you sure you want to delete this location?')) {
        return;
    }

    try {
        const response = await fetch(`${PLACEHOLDER_API_URL}/${id}`, {
            method: 'DELETE'
        });

        displayResponseInfo('DELETE', `${PLACEHOLDER_API_URL}/${id}`, response.status, {
            message: 'Resource deleted successfully'
        });

        if (!response.ok) {
            throw new Error('Failed to delete location');
        }

        savedLocations = savedLocations.filter(loc => loc.id !== id);
        renderSavedLocations();

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}