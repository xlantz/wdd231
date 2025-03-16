document.addEventListener('DOMContentLoaded', () => {
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
            const response = await fetch('data/members.json'); // Replace with actual path to your JSON file or API endpoint
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
        } catch (error) {
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
