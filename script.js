document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const loginMessage = document.getElementById('login-message');
    const addPerfumeSection = document.getElementById('add-perfume-section');
    const addPerfumeForm = document.getElementById('add-perfume-form');
    const perfumeList = document.getElementById('perfume-list');
    const perfumeNameInput = document.getElementById('perfume-name');
    const perfumeDescriptionInput = document.getElementById('perfume-description');

    let isLoggedIn = false; // Symulacja stanu zalogowania

    // Funkcja do odczytywania perfum z localStorage
    function loadPerfumes() {
        const storedPerfumes = localStorage.getItem('perfumes');
        if (storedPerfumes) {
            const perfumes = JSON.parse(storedPerfumes);
            perfumes.forEach(perfume => {
                addPerfumeToList(perfume.name, perfume.description, false); // 'false' oznacza, że nie trzeba czyścić inputów
            });
        }
    }

    // Wywołaj funkcję loadPerfumes przy załadowaniu strony
    loadPerfumes();

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Symulacja sprawdzenia loginu i hasła (NIEBEZPIECZNE W PRAWDZIWEJ APLIKACJI!)
        if (username === '2137' && password === '2137') {
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
                addPerfumeToList(name, description, true); // 'true' oznacza, że trzeba wyczyścić inputy
                savePerfumes();
            } else {
                alert('Proszę podać nazwę perfum.');
            }
        } else {
            alert('Musisz być zalogowany, aby dodać perfumy.');
        }
    });

    function addPerfumeToList(name, description, shouldClearInputs) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${name}</strong>
            ${description ? `<p class="perfume-details">${description}</p>` : ''}
            <button class="delete-button">Usuń</button>
        `;
        listItem.dataset.perfumeName = name; // Dodaj atrybut data, aby łatwiej identyfikować perfumy
        perfumeList.appendChild(listItem);

        if (shouldClearInputs) {
            clearInputFields();
        }
    }

    function clearInputFields() {
        perfumeNameInput.value = '';
        perfumeDescriptionInput.value = '';
    }

    function savePerfumes() {
        const perfumes = [];
        const listItems = perfumeList.querySelectorAll('li');
        listItems.forEach(item => {
            perfumes.push({
                name: item.dataset.perfumeName,
                description: item.querySelector('.perfume-details')?.textContent || ''
            });
        });
        localStorage.setItem('perfumes', JSON.stringify(perfumes));
    }

    perfumeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const listItemToRemove = event.target.parentNode;
            perfumeList.removeChild(listItemToRemove);
            savePerfumes(); // Zapisz listę po usunięciu
        }
    });
});
