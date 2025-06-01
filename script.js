document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const loginMessage = document.getElementById('login-message');
    const addPerfumeSection = document.getElementById('add-perfume-section');
    const addPerfumeForm = document.getElementById('add-perfume-form');
    const perfumeList = document.getElementById('perfume-list');
    const perfumeNameInput = document.getElementById('perfume-name');
    const perfumeDescriptionInput = document.getElementById('perfume-description');
    const perfumePriceInput = document.getElementById('perfume-price');

    let isLoggedIn = false; // Symulacja stanu zalogowania

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Symulacja sprawdzenia loginu i hasła (NIEBEZPIECZNE W PRAWDZIWEJ APLIKACJI!)
        if (username === '123' && password === '123') {
            isLoggedIn = true;
            loginSection.style.display = 'none';
            addPerfumeSection.style.display = 'block';
            loginMessage.style.display = 'none';
        } else {
            loginMessage.style.display = 'block';
        }

        usernameInput.value = '';
        passwordInput.value = '';
    });

    addPerfumeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (isLoggedIn) {
            const name = perfumeNameInput.value.trim();
            const description = perfumeDescriptionInput.value.trim();

            if (name) {
                addPerfumeToList(name, description);
                clearInputFields();
            } else {
                alert('Proszę podać nazwę perfum.');
            }
        } else {
            alert('Musisz być zalogowany, aby dodać perfumy.');
        }
    });

    function addPerfumeToList(name, description) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${name}</strong>
            ${description ? `<p class="perfume-details">${description}</p>` : ''}
            <button class="delete-button">Usuń</button>
        `;
        perfumeList.appendChild(listItem);
    }

    function clearInputFields() {
        perfumeNameInput.value = '';
        perfumeDescriptionInput.value = '';
        perfumePriceInput.value = '';
    }

    // Delegacja zdarzeń do obsługi kliknięcia przycisku "Usuń"
    perfumeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const listItemToRemove = event.target.parentNode;
            perfumeList.removeChild(listItemToRemove);
        }
    });
});