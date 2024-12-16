// Récupération des éléments
const projects = document.querySelectorAll('.project');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Éléments de la popup
const popupTitle = document.getElementById('popup-title');
const popupInfo = document.getElementById('popup-info');
const popupImg = document.getElementById('popup-img');

// Gestion des clics sur les projets
projects.forEach(project => {
    project.addEventListener('click', () => {
        // Récupérer les données du projet
        const title = project.getAttribute('data-title');
        const imgSrc = project.getAttribute('data-img');
        const file = project.getAttribute('data-file');

        // Mettre à jour le titre et l'image
        popupTitle.textContent = title;
        popupImg.src = imgSrc;

        // Charger le contenu du fichier texte avec fetch
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier texte.');
                }
                return response.text();
            })
            .then(data => {
                popupInfo.textContent = data; // Insérer le contenu dans la popup
                popup.style.display = 'flex'; // Afficher la popup
            })
            .catch(error => {
                console.error('Erreur:', error);
                popupInfo.textContent = "Impossible de charger les informations.";
                popup.style.display = 'flex'; // Afficher quand même la popup
            });
    });
});

// Gestion de la fermeture de la popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Fermer la popup en cliquant à l'extérieur
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
