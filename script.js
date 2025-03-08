document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming...',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web...',
      technology: ['HTML', 'CSS'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'CSE 111 students become more organized...',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce the notion of classes...',
      technology: ['C#'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience in Web Fundamentals...',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: false
    }
  ];

  const courseListContainer = document.getElementById('course-list');
  const totalCreditsDisplay = document.getElementById('total-credits');

  // Function to render courses dynamically
  function renderCourses(filteredCourses) {
    courseListContainer.innerHTML = ''; // Clear existing courses
    let totalCredits = 0;

    filteredCourses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-card', course.completed ? 'completed' : 'not-completed');

      const courseTitle = document.createElement('h3');
      courseTitle.classList.add('course-title');
      courseTitle.textContent = `${course.title} (${course.subject} ${course.number})`;

      const courseCredits = document.createElement('p');
      courseCredits.classList.add('course-credits');
      courseCredits.textContent = `Credits: ${course.credits}`;

      const courseDescription = document.createElement('p');
      courseDescription.classList.add('course-description');
      courseDescription.textContent = course.description;

      courseCard.appendChild(courseTitle);
      courseCard.appendChild(courseCredits);
      courseCard.appendChild(courseDescription);

      courseListContainer.appendChild(courseCard);

      totalCredits += course.credits;
    });

    totalCreditsDisplay.textContent = totalCredits;
  }

  // Filter courses based on selected category
  const allCoursesButton = document.getElementById('all-courses');
  const wddCoursesButton = document.getElementById('wdd-courses');
  const cseCoursesButton = document.getElementById('cse-courses');

  allCoursesButton.addEventListener('click', () => renderCourses(courses));
  wddCoursesButton.addEventListener('click', () => renderCourses(courses.filter(course => course.subject === 'WDD')));
  cseCoursesButton.addEventListener('click', () => renderCourses(courses.filter(course => course.subject === 'CSE')));

  // Initial render: show all courses
  renderCourses(courses);

  // Footer
  const currentYear = new Date().getFullYear();
  const lastModifiedDate = document.lastModified;

  const footer = document.querySelector('footer');
  const firstParagraph = footer.querySelector('p:nth-of-type(1)');
  const secondParagraph = footer.querySelector('p:nth-of-type(2)');

  // Update the content of the paragraphs
  firstParagraph.textContent = `© ${currentYear} | Alexander M. Lanterman | VA`;
  secondParagraph.textContent = `Last modified: ${lastModifiedDate}`;

  // Function to toggle the menu visibility
  function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('visible'); // Add/remove the "visible" class
}
});
