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



// Function to fetch and display companies dynamically
document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const companyCardsContainer = document.getElementById('company-cards');
        data.forEach(company => {
          const card = document.createElement('div');
          card.classList.add('company-card');
          
          // Create the HTML content for each card
          card.innerHTML = `
            <img src="${company.image}" alt="${company.name} Logo">
            <h3>${company.name}</h3>
            <p>${company.industry}</p>
            <p>Founded: ${company.founded}</p>
            <a href="${company.website}" target="_blank">Visit Website</a>
          `;
          
          // Append the card to the container
          companyCardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  // Set timestamp when the page loads (for index.html)
  window.onload = function() {
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
      timestamp.value = new Date().toISOString();
    }
  };
  
  // Populate form data on thank you page (for thankyou.html)
  if (window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('first-name').textContent = urlParams.get('first-name');
    document.getElementById('last-name').textContent = urlParams.get('last-name');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('mobile').textContent = urlParams.get('mobile');
    document.getElementById('business-name').textContent = urlParams.get('business-name');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');
  }
  
document.addEventListener('DOMContentLoaded', () => {
    const locationsData = [
        { "name": "Antelope Island", "address": "4528 West 1700 South, Syracuse, Utah 84075", "image": "images/bison_antelope_island.webp", "description": "Island where you can see bison and antelope roaming around." },
        { "name": "Black Island Farms", "address": "2075 4000 W, Syracuse, UT 84075", "image": "images/black_island_farms.webp", "description": "Take your family for some farm fun." },
        { "name": "Buffalo Point", "address": "Antelope Island Rd, Syracuse, UT 84075", "image": "images/buffalo_point.webp", "description": "Hike one of the most stunning places on the salt lake." },
        { "name": "Frary Peak Trail", "address": "4528 W 1700 S, Syracuse, UT 84075", "image": "images/frary_peak_trail.webp", "description": "Hiking trail to get a good glimpse of the Davis & Salt Lake Vallies" },
        { "name": "Great Escape Room", "address": "525 Ring Rd, Layton, UT 84041", "image": "images/great_escape_room.webp", "description": "Real life puzzles in 60 mins, can you beat it?" },
        { "name": "Great Salt Lake", "address": "Great Salt Lake, UT", "image": "images/great_salt_lake.webp", "description": "See one of the largest salt lakes in the world." },
        { "name": "Sea Quest", "address": "1201 N Hill Field Rd, Layton, UT 84041", "image": "images/sea_quest.webp", "description": "Come see aquarium entertainment." },
        { "name": "Syracuse Utah Temple", "address": "1025 S 2500 W, Syracuse, UT 84075", "image": "images/syracuse_ut_temple.webp", "description": "One of the most stunning religious buildings in the world." }
    ];

    const cardsContainer = document.getElementById('cards-container');
    
    // Function to display cards
    locationsData.forEach(location => {
        const card = document.createElement('div');
        card.classList.add('location-card');
        card.innerHTML = `
            <h2>${location.name}</h2>
            <figure>
                <img src="${location.image}" alt="${location.name}" class="location-image">
            </figure>
            <address>${location.address}</address>
            <p>${location.description}</p>
            <button>Learn More</button>
        `;
        cardsContainer.appendChild(card);
    });

    // LocalStorage to track visits
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    const visitMessage = document.getElementById('visit-message');

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = currentDate - lastVisit;
        const dayInMillis = 86400000;
        const daysSinceLastVisit = Math.floor(timeDiff / dayInMillis);

        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }

    // Store current date in localStorage
    localStorage.setItem('lastVisit', currentDate);
    
    // Hover effect for images (only for large screens)
    const images = document.querySelectorAll('.location-image');
    images.forEach(image => {
        image.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {  // Only apply hover effect on large screens
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.3s ease';
            }
        });
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });
    
    function addQueryParams(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const form = event.target;
        const url = new URL(form.action);
        
        // Append form data as URL parameters
        new FormData(form).forEach((value, key) => {
            url.searchParams.append(key, value);
        });
        
        // Redirect to the thank-you page with query parameters
        window.location.href = url.toString();
    }
    

});
