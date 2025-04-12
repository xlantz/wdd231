document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');

    hamburgerIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Display current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Display last modified date
    document.getElementById('lastModified').textContent = `Last updated: ${document.lastModified}`;
});

document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const parentItem = this.closest('.faq-item');
            parentItem.classList.toggle('active');
        });
    });
});

let foodData = [];

function displayFoods(type = "all") {
    const container = document.getElementById("food-container");
    container.innerHTML = "";

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

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger + footer + FAQ code stays the same

    // Fetch food data from external JSON file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            foodData = data;
            displayFoods(); // Show all by default

            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    displayFoods(type);
                });
            });
        })
        .catch(error => {
            console.error("Error loading JSON data:", error);
        });
});
