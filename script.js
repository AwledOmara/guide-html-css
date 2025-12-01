// Navigation et suivi de progression
document.addEventListener('DOMContentLoaded', function () {
    // Initialisation des éléments de navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navSections = document.querySelectorAll('.nav-section');
    const progressBar = document.getElementById('progressBar');
    const completedSpan = document.getElementById('completed');
    const totalSpan = document.getElementById('total');
    const iframe = document.querySelector('iframe[name="content"]');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    // --- Gestion du Menu Mobile ---
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Gestion de la Progression ---
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');

    // Nettoyer le localStorage : garder uniquement les pages de cours
    visitedPages = visitedPages.filter(page => page.startsWith('pages/'));
    localStorage.setItem('visitedPages', JSON.stringify(visitedPages));

    // Compter uniquement les pages de cours (exclure les ateliers)
    const courseLinks = Array.from(navLinks).filter(link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('pages/');
    });

    // Mettre à jour les totaux si les éléments existent (page index)
    if (totalSpan && completedSpan && progressBar) {
        totalSpan.textContent = courseLinks.length;
        updateProgress();
    }

    // Restaurer la dernière page visitée au chargement
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage && iframe) {
        iframe.src = lastPage;
        markActiveLink(lastPage);
    }

    // Écouter les clics sur les liens de navigation
    navLinks.forEach(link => {
        // Marquer visité si dans l'historique
        if (visitedPages.includes(link.getAttribute('href'))) {
            link.classList.add('visited');
        }

        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Sauvegarder la page active
            localStorage.setItem('lastPage', href);

            // Marquer comme visité
            if (!visitedPages.includes(href)) {
                visitedPages.push(href);
                localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
                link.classList.add('visited');
                updateProgress();
            }

            // Mettre à jour l'état actif
            markActiveLink(href);
        });
    });

    // Fonction pour marquer le lien actif
    function markActiveLink(href) {
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = Array.from(navLinks).find(l => l.getAttribute('href') === href);
        if (activeLink) {
            activeLink.classList.add('active');
            // Ouvrir la section parente
            const parentSection = activeLink.closest('.nav-section');
            if (parentSection) {
                parentSection.classList.add('active');
            }
        }
    }

    // Toggle sections du menu
    navSections.forEach(section => {
        const header = section.querySelector('h3');
        if (header) {
            header.addEventListener('click', () => {
                section.classList.toggle('active');
            });
        }
    });

    function updateProgress() {
        if (!progressBar) return;

        // Compter uniquement les pages de cours visitées (exclure les ateliers)
        const visitedCoursePages = visitedPages.filter(page => page.startsWith('pages/'));
        const completed = visitedCoursePages.length;
        const total = courseLinks.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;

        completedSpan.textContent = completed;
        progressBar.style.width = percentage + '%';
    }

    // --- Initialisation des fonctionnalités ---
    initCodeBlocks();
    initTheme();
});

// --- Gestion des Blocs de Code (Copie) ---
function initCodeBlocks() {
    document.querySelectorAll('.code-block').forEach(block => {
        // Vérifier si le bouton existe déjà
        if (block.querySelector('.copy-btn')) return;

        const pre = block.querySelector('pre');
        if (!pre) return;

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = '📋 Copier';
        button.onclick = () => copyCode(button, pre);

        block.style.position = 'relative';
        block.appendChild(button);
    });
}

function copyCode(button, preElement) {
    const text = preElement.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copié !';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie :', err);
        button.textContent = '❌ Erreur';
    });
}

// --- Système de Solution ---
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

// --- Mode Sombre ---
function initTheme() {
    // Créer le bouton de thème s'il n'existe pas
    if (!document.getElementById('theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Changer le thème';
        themeToggle.setAttribute('aria-label', 'Changer le thème');
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.innerHTML = '☀️';
    }
}

// Réinitialiser la progression (disponible dans la console)
window.resetProgress = function () {
    if (confirm('Voulez-vous réinitialiser votre progression ?')) {
        localStorage.removeItem('visitedPages');
        localStorage.removeItem('lastPage');
        location.reload();
    }
};
