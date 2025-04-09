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
