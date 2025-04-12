document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Navigation Toggle ===
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerIcon && navMenu) {
        hamburgerIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // === Footer Year and Last Modified ===
    const currentYear = new Date().getFullYear();
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) currentYearElem.textContent = currentYear;

    const lastModifiedElem = document.getElementById('lastModified');
    if (lastModifiedElem) lastModifiedElem.textContent = `Last updated: ${document.lastModified}`;

    // === FAQ Toggle ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const parentItem = this.closest('.faq-item');
            parentItem.classList.toggle('active');
        });
    });

    // === Food Page Handling ===
    const foodContainer = document.getElementById("food-container");
    if (foodContainer) {
        let foodData = [];

        function displayFoods(type = "all") {
            foodContainer.innerHTML = "";
            const filtered = type === "all" ? foodData : foodData.filter(food => food.type === type);

            filtered.forEach(food => {
                const card = document.createElement("div");
                card.classList.add("food-card");
                card.innerHTML = `
                    <h3>${food.name}</h3>
                    <p><strong>Found in:</strong> ${food.found}</p>
                    <p><strong>Type:</strong> ${food.type}</p>
                    <p><strong>Nutrients:</strong> ${food.nutrients}</p>
                `;
                foodContainer.appendChild(card);
            });
        }

        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error("Failed to load food data.");
                return response.json();
            })
            .then(data => {
                foodData = data.filter(item => item.name); // Filter to just food items
                displayFoods(); // Default view

                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const type = btn.dataset.type;
                        displayFoods(type);
                    });
                });
            })
            .catch(error => console.error("Food data error:", error));
    }

    // === Recipe Page Handling ===
    const recipeContainer = document.getElementById("recipe-container");
    if (recipeContainer) {
        let recipeData = [];

        function displayRecipes(meal = "all") {
            recipeContainer.innerHTML = "";

            const filtered = meal === "all"
                ? recipeData
                : recipeData.filter(recipe => recipe.meal === meal);

            if (filtered.length === 0) {
                recipeContainer.innerHTML = "<p>No recipes found for this meal type.</p>";
                return;
            }

            filtered.forEach(recipe => {
                const card = document.createElement("div");
                card.classList.add("recipe-card");
                card.innerHTML = `
                    <h3>${recipe.dish}</h3>
                    <p><strong>Meal:</strong> ${recipe.meal}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> ${recipe.recipie}</p>
                    <a href="${recipe.website}" target="_blank">View Full Recipe</a>
                `;
                recipeContainer.appendChild(card);
            });
        }

        fetch("data.json")
            .then(res => res.json())
            .then(data => {
                recipeData = data.filter(item => item.dish); // Filter to recipe items
                displayRecipes();

                const filterBtns = document.querySelectorAll(".filter-btn");
                filterBtns.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const mealType = btn.dataset.meal;
                        displayRecipes(mealType);
                    });
                });
            })
            .catch(err => console.error("Recipe data error:", err));
    }

    // === Weather Handling on Home Page ===
    const currentWeatherBox = document.getElementById('current-weather');
    const forecastBox = document.getElementById('weather-forecast');

    if (currentWeatherBox && forecastBox) {
        function displayCurrentWeather(data) {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            currentWeatherBox.innerHTML = `
                <div class="weather-card">
                    <h3>Layton, UT</h3>
                    <img src="${iconUrl}" alt="${weatherDescription}" class="weather-icon">
                    <p><strong>${weatherDescription}</strong></p>
                    <p>🌡️ Temp: ${temperature}°F</p>
                    <p>💧 Humidity: ${humidity}%</p>
                    <p>💨 Wind: ${windSpeed} m/s</p>
                    <p>📈 Pressure: ${pressure} hPa</p>
                </div>
            `;
        }

        function displayWeatherForecast(data) {
            const forecast = data.list.slice(0, 3);
            let forecastHTML = '';

            forecast.forEach((item, index) => {
                const date = new Date(item.dt * 1000);
                const options = { weekday: 'long', timeZone: 'America/Denver' };
                let dayName = new Intl.DateTimeFormat('en-US', options).format(date);
                if (index === 0) dayName = "Today";
                else if (index === 1) dayName = "Tomorrow";

                const temp = item.main.temp;
                const description = item.weather[0].description;
                const iconCode = item.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                forecastHTML += `
                    <div class="weather-card">
                        <h4>${dayName}</h4>
                        <img src="${iconUrl}" alt="${description}" class="weather-icon">
                        <p><strong>${description}</strong></p>
                        <p>🌡️ ${temp}°F</p>
                    </div>
                `;
            });

            forecastBox.innerHTML = forecastHTML;
        }

        // Fetch weather data from OpenWeatherMap
        const apiKey = 'bb043723017f9fc899318f76b17c25c1';
        const city = 'Layton,us';
        const units = 'imperial';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},US&appid=${apiKey}&units=${units}`)
            .then(response => response.json())
            .then(data => displayCurrentWeather(data))
            .catch(error => console.error('Error fetching current weather:', error));

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},US&appid=${apiKey}&units=${units}`)
            .then(response => response.json())
            .then(data => displayWeatherForecast(data))
            .catch(error => console.error('Error fetching weather forecast:', error));
    }
});
