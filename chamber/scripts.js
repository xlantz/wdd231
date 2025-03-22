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

