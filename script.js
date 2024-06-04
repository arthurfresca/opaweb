document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.classList.contains('submenu-toggle')) {
                e.preventDefault();

                const sectionId = link.getAttribute('data-section');
                sections.forEach(section => {
                    section.classList.add('hidden');
                });

                document.getElementById(sectionId).classList.remove('hidden');

                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('show');
                }

                // Hide all submenus when a link is clicked
                document.querySelectorAll('.submenu').forEach(submenu => {
                    submenu.classList.remove('show');
                });
            }
        });
    });

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
});
