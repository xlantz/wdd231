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
