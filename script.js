document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggleButton = document.querySelector('#toggle-nav');

  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Update current year
  document.getElementById("currentyear").textContent = new Date().getFullYear();

  // Update last modified date
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

  const courses = [
      { name: "Web Development", completed: true, credits: 3 },
      { name: "Computer Science", completed: false, credits: 4 },
      { name: "Networking", completed: true, credits: 3 },
      // Add more courses as needed
  ];

  function displayCourses(courseArray) {
      const courseList = document.getElementById('course-list');
      courseList.innerHTML = ''; // Clear existing content
  
      courseArray.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
          <h3>${course.name}</h3>
          <p>Credits: ${course.credits}</p>
          <p>Status: ${course.completed ? 'Completed' : 'Not Completed'}</p>
        `;
        if (course.completed) {
          courseCard.style.backgroundColor = '#c8e6c9'; // Completed course (light green)
        }
        courseList.appendChild(courseCard);
      });
  }
  
  // Display all courses by default when the page loads
  displayCourses(courses);

  document.getElementById('all-courses').addEventListener('click', () => {
      displayCourses(courses);
  });

  // Add other filter buttons similarly
});
