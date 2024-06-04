document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionId = link.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.add('hidden');
            });

            document.getElementById(sectionId).classList.remove('hidden');

            // Hide the menu after clicking a link (for mobile view)
            navLinks.classList.remove('show');
        });
    });

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});