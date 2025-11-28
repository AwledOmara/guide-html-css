// Navigation et suivi de progression
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navSections = document.querySelectorAll('.nav-section');
    const progressBar = document.getElementById('progressBar');
    const completedSpan = document.getElementById('completed');
    const totalSpan = document.getElementById('total');

    // Charger la progression depuis localStorage
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');

    // Compter le total de pages
    totalSpan.textContent = navLinks.length;
    updateProgress();

    // Toggle sections
    navSections.forEach(section => {
        const header = section.querySelector('h3');
        header.addEventListener('click', () => {
            section.classList.toggle('active');
        });
    });

    // Gérer les clics sur les liens
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));

            // Ajouter la classe active au lien cliqué
            this.classList.add('active');

            // Marquer comme visité
            const href = this.getAttribute('href');
            if (!visitedPages.includes(href)) {
                visitedPages.push(href);
                localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
                updateProgress();
            }

            // Marquer visuellement comme visité
            this.classList.add('visited');
        });

        // Marquer les pages déjà visitées
        const href = link.getAttribute('href');
        if (visitedPages.includes(href)) {
            link.classList.add('visited');
        }
    });

    function updateProgress() {
        const completed = visitedPages.length;
        const total = navLinks.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;

        completedSpan.textContent = completed;
        progressBar.style.width = percentage + '%';
    }

    // Réinitialiser la progression (pour le développement)
    window.resetProgress = function () {
        if (confirm('Voulez-vous réinitialiser votre progression ?')) {
            localStorage.removeItem('visitedPages');
            visitedPages = [];
            navLinks.forEach(link => link.classList.remove('visited'));
            updateProgress();
        }
    };
});

// Fonction pour copier le code
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        button.textContent = '✓ Copié !';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.textContent = '📋 Copier';
            button.style.background = '';
        }, 2000);
    });
}

// Fonction pour afficher/cacher les solutions
function toggleSolution(button) {
    const container = button.parentElement;
    const content = container.querySelector('.solution-content');

    content.classList.toggle('show');
    button.classList.toggle('active');

    if (content.classList.contains('show')) {
        button.textContent = 'Cacher la solution';
    } else {
        button.textContent = 'Afficher la solution';
    }
}
