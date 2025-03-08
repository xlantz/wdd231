document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggleButton = document.querySelector('#toggle-nav');

  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

// Footer
const currentYear = new Date().getFullYear();
const lastModifiedDate = document.lastModified;

const footer = document.querySelector('footer');
const firstParagraph = footer.querySelector('p:nth-of-type(1)');
const secondParagraph = footer.querySelector('p:nth-of-type(2)');

// Update the content of the paragraphs
firstParagraph.textContent = `© ${currentYear} | Alexander M. Lanterman`;
secondParagraph.textContent = `Last modified: ${lastModifiedDate}`;
});
