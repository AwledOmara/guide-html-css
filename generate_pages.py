#!/usr/bin/env python3
"""
Générateur d'ateliers pratiques HTML/CSS
Crée des ateliers guidés étape par étape
"""

import os

def create_atelier_template(numero, titre, emoji, description, objectifs, etapes, defis):
    """Crée le template HTML d'un atelier pratique"""
    
    objectifs_html = '\n'.join([f'                <li>{obj}</li>' for obj in objectifs])
    
    etapes_html = ''
    for i, etape in enumerate(etapes, 1):
        etapes_html += f'''
                <div class="activity-step" data-step="{i}">
                    <h4>{etape['titre']}</h4>
                    <p>{etape['description']}</p>
                    {f'<div class="code-block"><pre><code>{etape["code"]}</code></pre></div>' if 'code' in etape else ''}
                    {f'<div class="info-box {etape["info_type"]}"><strong>{etape["info_titre"]}</strong><p>{etape["info_texte"]}</p></div>' if 'info_type' in etape else ''}
                </div>
'''
    
    defis_html = ''
    for i, defi in enumerate(defis, 1):
        niveau = 'easy' if i == 1 else ('medium' if i == 2 else 'hard')
        etoiles = '⭐' * i
        defis_html += f'''
                <div class="challenge-level {niveau}">
                    <h4>{etoiles} Défi {i} : {defi['titre']}</h4>
                    <p>{defi['description']}</p>
                    {f'<div class="code-block"><pre><code>{defi["code"]}</code></pre></div>' if 'code' in defi else ''}
                </div>
'''
    
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atelier {numero} : {titre}</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div class="page">
        <div class="page-header">
            <h1>{emoji} Atelier {numero} : {titre}</h1>
            <p class="subtitle">{description}</p>
        </div>

        <div class="section objectifs">
            <h2 class="section-title">🎯 Ce que tu vas créer</h2>
            <ul>
{objectifs_html}
            </ul>
        </div>

        <div class="activity">
            <h3 class="activity-title">✍️ Suis les étapes</h3>
            
            <div class="activity-steps">
{etapes_html}
            </div>
        </div>

        <div class="challenge">
            <h3 class="challenge-title">🏆 Défis bonus</h3>
{defis_html}
        </div>

        <div class="info-box success">
            <strong>🎉 Bravo !</strong>
            <p>Tu as terminé l'atelier {numero} ! Continue vers le prochain atelier.</p>
        </div>
    </div>
</body>
</html>'''

# Définition des ateliers
ateliers = {
    "atelier3-tableau.html": {
        "numero": 3,
        "titre": "Tableau de Notes",
        "emoji": "📊",
        "description": "Crée un tableau de notes d'élèves",
        "objectifs": [
            "Créer un tableau HTML",
            "Utiliser thead, tbody, tfoot",
            "Fusionner des cellules",
            "Styliser le tableau avec CSS"
        ],
        "etapes": [
            {
                "titre": "Crée la structure de base",
                "description": "Commence par créer un fichier notes.html avec un tableau vide :",
                "code": '''<table>
    <thead>
        <!-- En-tête ici -->
    </thead>
    <tbody>
        <!-- Corps ici -->
    </tbody>
</table>'''
            },
            {
                "titre": "Ajoute l'en-tête du tableau",
                "description": "Dans <thead>, ajoute les titres des colonnes :",
                "code": '''<thead>
    <tr>
        <th>Nom</th>
        <th>Math</th>
        <th>Français</th>
        <th>Moyenne</th>
    </tr>
</thead>'''
            }
        ],
        "defis": [
            {"titre": "Ajoute des bordures", "description": "Utilise CSS pour ajouter des bordures au tableau"},
            {"titre": "Colore les lignes", "description": "Alterne les couleurs des lignes (une ligne sur deux)"},
            {"titre": "Ajoute un pied de page", "description": "Utilise <tfoot> pour afficher la moyenne générale"}
        ]
    },
    
    "atelier4-carte.html": {
        "numero": 4,
        "titre": "Carte de Visite Stylisée",
        "emoji": "🎨",
        "description": "Stylise une carte avec CSS",
        "objectifs": [
            "Utiliser les couleurs CSS",
            "Appliquer des dégradés",
            "Changer les polices",
            "Créer des ombres"
        ],
        "etapes": [
            {
                "titre": "Crée la carte HTML",
                "description": "Structure de base de la carte :",
                "code": '''<div class="carte">
    <h2>Ton Nom</h2>
    <p>Développeur Web</p>
</div>'''
            }
        ],
        "defis": [
            {"titre": "Change les couleurs", "description": "Utilise un dégradé de ton choix"},
            {"titre": "Ajoute une animation", "description": "Anime la carte au survol"},
            {"titre": "Rends-la responsive", "description": "Adapte la carte aux mobiles"}
        ]
    }
}

def main():
    pages_dir = "/home/nizar/Projects/guide-html/pages"
    os.makedirs(pages_dir, exist_ok=True)
    
    created = 0
    for filename, data in ateliers.items():
        filepath = os.path.join(pages_dir, filename)
        if not os.path.exists(filepath):
            content = create_atelier_template(
                data["numero"],
                data["titre"],
                data["emoji"],
                data["description"],
                data["objectifs"],
                data["etapes"],
                data["defis"]
            )
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Créé: {filename}")
            created += 1
        else:
            print(f"- Existe déjà: {filename}")
    
    print(f"\n{'='*50}")
    print(f"Ateliers créés: {created}")
    print(f"Total: {len(ateliers)}")

if __name__ == "__main__":
    main()
