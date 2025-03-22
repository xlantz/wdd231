document.addEventListener('DOMContentLoaded', () => {
    //Hamburger Menu
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');
  
    hamburgerIcon.addEventListener('click', () => {
      navMenu.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
    });

    // Footer
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = document.lastModified;

    const footer = document.querySelector('footer');
    const firstParagraph = footer.querySelector('p:nth-of-type(1)');
    const secondParagraph = footer.querySelector('p:nth-of-type(2)');

    // Update the content of the paragraphs
    firstParagraph.textContent = `© ${currentYear} | Alexander M. Lanterman | VA`;
    secondParagraph.textContent = `Last modified: ${lastModifiedDate}`;

    // Fetch and display member data
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json(); // Parse the JSON response

            const membersList = document.getElementById('members-list');
            membersList.innerHTML = ''; // Clear any existing content

            members.forEach(member => {
                // Create HTML for each member
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');

                memberCard.innerHTML = `
                    <img src="${member.image}" alt="${member.name} Logo" class="member-logo">
                    <h3>${member.name}</h3>
                    <p><strong>Industry:</strong> ${member.industry}</p>
                    <p><strong>Founded:</strong> ${member.founded}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone_number}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                `;

                // Append member card to the container
                membersList.appendChild(memberCard);
            });
        } 
        catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    // Toggle between grid view and list view
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const membersList = document.getElementById('members-list');

    gridViewBtn.addEventListener('click', () => {
        membersList.classList.remove('list-view'); // Remove list-view class
        membersList.classList.add('grid-view'); // Add grid-view class (you can customize this if needed)
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        membersList.classList.add('list-view'); // Add list-view class
        membersList.classList.remove('grid-view'); // Remove grid-view class
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });

    // Call the function to fetch and display the members
    fetchMembers();

});

document.addEventListener('DOMContentLoaded', () => {
    async function fetchBusinesses() {
        try {
            const response = await fetch('data/members.json');
            const businesses = await response.json();

            // Filter businesses with membership levels 2 or 3
            const filteredBusinesses = businesses.filter(business => 
                business.membership_level === 2 || business.membership_level === 3
            );

            displayRandomBusinesses(filteredBusinesses);
        } catch (error) {
            console.error('Error fetching business data:', error);
        }
    }

    function displayRandomBusinesses(businesses) {
        const randomBusinessesSection = document.querySelector('#random-businesses');

        // Randomly shuffle the filtered businesses array
        const shuffledBusinesses = businesses.sort(() => 0.5 - Math.random());

        // Limit to 3 businesses (display 3 at a time)
        const randomSelectedBusinesses = shuffledBusinesses.slice(0, 3);

        // Clear the section before adding new businesses
        randomBusinessesSection.innerHTML = '';

        // Create a business card for each selected business
        randomSelectedBusinesses.forEach(business => {
            const businessBox = document.createElement('div');
            businessBox.classList.add('business-box');

            const businessLogo = document.createElement('img');
            businessLogo.src = business.image;
            businessLogo.alt = `${business.name} Logo`;
            businessLogo.classList.add('business-logo');

            const businessName = document.createElement('p');
            businessName.textContent = business.name;
            businessName.classList.add('business-name');

            const businessIndustry = document.createElement('p');
            businessIndustry.textContent = business.industry;
            businessIndustry.classList.add('business-industry');

            const businessWebsite = document.createElement('a');
            businessWebsite.href = business.website;
            businessWebsite.target = "_blank";
            businessWebsite.textContent = 'Visit Website';
            businessWebsite.classList.add('business-website');

            // Append elements to the business box
            businessBox.appendChild(businessLogo);
            businessBox.appendChild(businessName);
            businessBox.appendChild(businessIndustry);
            businessBox.appendChild(businessWebsite);

            // Append the business box to the section
            randomBusinessesSection.appendChild(businessBox);
        });
    }

    // Fetch and display businesses when the page loads
    fetchBusinesses();
});

// API Key for OpenWeatherMap
const apiKey = 'bb043723017f9fc899318f76b17c25c1';
const city = 'Layton,us'; 
const units = 'imperial'; 

document.addEventListener('DOMContentLoaded', () => {
    // Fetch weather data on page load
    fetchWeatherData();
});

async function fetchWeatherData() {
    try {
        // Fetch current weather data from OpenWeatherMap API
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
        const currentWeather = await currentWeatherResponse.json();

        // Fetch forecast data from OpenWeatherMap API
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&cnt=3&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        // Display current weather
        displayCurrentWeather(currentWeather);

        // Display weather forecast
        displayWeatherForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('current-weather').innerHTML = 'Unable to fetch weather data.';
        document.getElementById('weather-forecast').innerHTML = 'Unable to fetch weather forecast.';
    }
}

function displayCurrentWeather(data) {
    const currentWeatherBox = document.getElementById('current-weather');
    
    // Extract necessary data
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const iconCode = data.weather[0].icon;  // Icon code from the API response
    
    // Construct the icon image URL
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Display current weather with icon
    currentWeatherBox.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
        <p><strong>Temperature:</strong> ${temperature}°F</p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
    `;
}


function displayWeatherForecast(data) {
    const forecastBox = document.getElementById('weather-forecast');

    // Get the forecast for the next 3 periods (we will process today + next 2)
    const forecast = data.list.slice(0, 3);

    let forecastHTML = '';
    forecast.forEach((item, index) => {
        const date = new Date(item.dt * 1000); // Convert Unix timestamp to Date object

        // Convert the date to Mountain Standard Time (MST)
        const options = { weekday: 'long', timeZone: 'America/Denver' };
        let dayName = new Intl.DateTimeFormat('en-US', options).format(date);

        // Customize day labels
        if (index === 0) {
            dayName = "Today"; // For the current day
        } else if (index === 1) {
            dayName = "Tomorrow"; // For the next day
        }

        const temp = item.main.temp;
        const description = item.weather[0].description;

        forecastHTML += `
            <p><strong>${dayName}:</strong> ${temp}°F</p>
        `;
    });

    forecastBox.innerHTML = forecastHTML;
}


