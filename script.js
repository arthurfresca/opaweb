document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('[data-section]');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            submenu.classList.toggle('show');
        });
    });

    // Set up event listeners for each link
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if(this.getAttribute('data-section')){
                loadSection(sectionId);
                history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
            }
        });
    });

    // Set the default section to load based on the URL
    const defaultSectionId = window.location.hash.substring(1);
    loadSection(defaultSectionId || 'what-we-are');

    function loadSection(sectionId) {
        const sectionElement = document.getElementById('section');
        fetch(`sections/${sectionId}.html`)
            .then(response => response.text())
            .then(data => {
                sectionElement.innerHTML = data;
            });
    }
});

// Listen for popstate event to handle back/forward button navigation
window.addEventListener('popstate', () => {
    const sectionId = history.state.sectionId;
    loadSection(sectionId);
});
