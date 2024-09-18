let members = [];
let oldAngels = [];
let newAngels = [];

function toggleAngel(faceitNick, hasAngel) {
    const angelButton = document.getElementById(`angel-${faceitNick}`);
    
    if (hasAngel) {
        // Change the button to grey and update text
        angelButton.style.backgroundColor = 'grey';
        angelButton.textContent = 'Anjo vai ser removido';
        oldAngels.push(faceitNick);
    } else {
        // Revert button color and text
        angelButton.style.backgroundColor = 'grey';
        angelButton.textContent = 'Anjo vai ser adicionado';
        newAngels.push(faceitNick);
    }

    // Toggle the angel state
    hasAngel = !hasAngel;
}

function fetchPlayers() {
    const adminKey = '123test123';  // Admin Key for authorization
    const apiUrl = 'https://csabe-cb95c9877c4f.herokuapp.com/opa/admin/member';

    // Fetch members from the API
    try {
        fetch(apiUrl, {
            headers: { 'AdminKey': adminKey }
        })
        .then(response => {
            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Return the response as JSON
            return response.json();
        })
        .then(data => {
            members = data;  // Assign the fetched members data
            populateTable();  // Call the function to populate the table
        })
        .catch(error => {
            console.error('Error fetching members:', error);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }

    // Populate the table with member data
    function populateTable() {
        const tableBody = document.getElementById('memberTableBody');
        tableBody.innerHTML = ''; // Clear the table

        members.forEach(member => {
            const row = document.createElement('tr');

            const buttonClass = member.hasAngel ? 'btn-red' : 'btn-green';
            const buttonText = member.hasAngel ? 'Remover Anjo' : 'Adicionar Anjo';

            row.innerHTML = `
                    <td>${member.faceitNick}</td>
                    <td>
                        <button id="angel-${member.faceitNick}" class="${buttonClass}" onclick="toggleAngel('${member.faceitNick}', ${member.hasAngel})">
                            ${buttonText}
                        </button>
                    </td>
                `;
            tableBody.appendChild(row);
        });
    }   
}

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

    document.addEventListener('click', (event) => {
        submenuToggles.forEach(toggle => {
            const submenu = toggle.nextElementSibling;
            if (!toggle.contains(event.target) && !submenu.contains(event.target)) {
                submenu.classList.remove('show');
            }
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
                if(sectionId === 'angels'){
                    const saveAngelsbutton = document.getElementById('saveButton');
                    if (saveAngelsbutton) {
                        saveAngelsbutton.addEventListener('click', saveAngel);
                    } else {
                        console.error('Save button not found in the DOM');
                    }
                    fetchPlayers();
                }
            });
    }

});

// Listen for popstate event to handle back/forward button navigation
window.addEventListener('popstate', () => {
    const sectionId = history.state.sectionId;
    loadSection(sectionId);
});

function saveAngel() {
    const adminKey = '123test123';  // Admin Key for authorization
    const saveAngelUrl = 'https://csabe-cb95c9877c4f.herokuapp.com/opa/admin/member/save-angel';

    const payload = {
        oldAngels: oldAngels,
        newAngels: newAngels
    };

    fetch(saveAngelUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Error saving changes');
        }
        return response.json(); // Return the parsed response if needed
    })
    .then(() => {
        alert('Changes saved successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
