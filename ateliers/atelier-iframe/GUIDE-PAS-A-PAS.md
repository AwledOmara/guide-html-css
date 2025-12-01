# Guide Pas à Pas - Atelier iFrame

## 📋 Table des Matières
1. [Introduction](#introduction)
2. [L'attribut `target` de `href`](#lattribut-target-de-href)
3. [Étapes de l'Atelier](#étapes-de-latelier)
4. [Exercices Pratiques](#exercices-pratiques)

---

## Introduction

Dans cet atelier, vous allez apprendre à créer un système de navigation avec des iframes. Vous découvrirez comment utiliser l'attribut `target` pour charger du contenu dans une iframe spécifique.

---

## L'attribut `target` de `href`

### Tableau Explicatif

| Valeur de `target` | Description | Exemple | Comportement |
|-------------------|-------------|---------|--------------|
| `_self` | Ouvre le lien dans la même fenêtre/frame (par défaut) | `<a href="page.html" target="_self">Lien</a>` | Remplace la page actuelle |
| `_blank` | Ouvre le lien dans une nouvelle fenêtre ou un nouvel onglet | `<a href="page.html" target="_blank">Lien</a>` | Nouvelle fenêtre/onglet |
| `_parent` | Ouvre le lien dans le cadre parent | `<a href="page.html" target="_parent">Lien</a>` | Remplace le cadre parent |
| `_top` | Ouvre le lien dans la fenêtre complète (sort de tous les frames) | `<a href="page.html" target="_top">Lien</a>` | Fenêtre complète |
| **Nom personnalisé** | Ouvre le lien dans un frame/fenêtre avec ce nom | `<a href="page.html" target="monIframe">Lien</a>` | Charge dans l'iframe nommée |

### 🎯 Focus sur l'utilisation avec les iframes

Quand vous utilisez un **nom personnalisé** comme valeur de `target`, le navigateur cherche une iframe (ou une fenêtre) avec l'attribut `name` correspondant.

**Exemple pratique :**

```html
<!-- L'iframe avec un nom -->
<iframe name="contenu" src="accueil.html"></iframe>

<!-- Le lien qui cible cette iframe -->
<a href="apropos.html" target="contenu">À Propos</a>
```

**Résultat :** Quand on clique sur le lien "À Propos", la page `apropos.html` se charge **à l'intérieur** de l'iframe nommée "contenu".

---

## Étapes de l'Atelier

### Étape 1 : Créer la structure HTML de base

**Objectif :** Créer le fichier `index.html` avec la structure de base.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atelier iFrame</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Le contenu viendra ici -->
    </div>
</body>
</html>
```

---

### Étape 2 : Ajouter le menu de navigation

**Objectif :** Créer un menu avec des liens qui ciblent l'iframe.

```html
<nav class="menu">
    <h2>Menu</h2>
    <ul>
        <li><a href="accueil.html" target="zone-contenu">🏠 Accueil</a></li>
        <li><a href="apropos.html" target="zone-contenu">ℹ️ À Propos</a></li>
        <li><a href="services.html" target="zone-contenu">⚙️ Services</a></li>
        <li><a href="galerie.html" target="zone-contenu">🖼️ Galerie</a></li>
        <li><a href="contact.html" target="zone-contenu">📧 Contact</a></li>
    </ul>
</nav>
```

**Points importants :**
- Tous les liens ont `target="zone-contenu"`
- Ce nom doit correspondre au `name` de l'iframe

---

### Étape 3 : Ajouter l'iframe

**Objectif :** Créer la zone d'affichage du contenu.

```html
<div class="content-area">
    <iframe 
        name="zone-contenu" 
        src="accueil.html"
        title="Zone de contenu">
    </iframe>
</div>
```

**Points importants :**
- `name="zone-contenu"` : correspond au `target` des liens
- `src="accueil.html"` : page affichée par défaut
- `title` : pour l'accessibilité

---

### Étape 4 : Ajouter le CSS de base

**Objectif :** Styliser la page pour un affichage agréable.

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background: #f1f5f9;
}

.container {
    display: flex;
    min-height: 100vh;
}

.menu {
    width: 250px;
    background: white;
    padding: 2rem;
    border-right: 1px solid #e2e8f0;
}

.content-area {
    flex: 1;
    padding: 2rem;
}

iframe {
    width: 100%;
    height: calc(100vh - 4rem);
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
}
```

---

### Étape 5 : Créer les pages de contenu

**Objectif :** Créer des pages simples à afficher dans l'iframe.

**Exemple : `accueil.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            padding: 2rem;
            background: #f8fafc;
        }
        h1 {
            color: #1e293b;
            font-size: 2.5rem;
        }
    </style>
</head>
<body>
    <h1>🏠 Bienvenue</h1>
    <p>Ceci est la page d'accueil chargée dans l'iframe.</p>
</body>
</html>
```

**À faire :** Créer les autres pages (`apropos.html`, `services.html`, etc.) avec un contenu différent.

---

## Exercices Pratiques

### Exercice 1 : Tester les différentes valeurs de `target`

1. Créez un lien avec `target="_blank"` dans le menu
2. Observez le comportement : nouvelle fenêtre/onglet
3. Créez un lien avec `target="_self"` 
4. Observez : remplace la page entière

**Question :** Quelle est la différence entre `target="_blank"` et `target="zone-contenu"` ?

---

### Exercice 2 : Ajouter un lien externe

1. Dans une des pages de contenu (ex: `services.html`), ajoutez un lien vers Google
2. Utilisez `target="_blank"` pour qu'il s'ouvre dans un nouvel onglet
3. Testez le lien

```html
<a href="https://www.google.com" target="_blank">Rechercher sur Google</a>
```

---

### Exercice 3 : Créer une deuxième iframe

1. Ajoutez une deuxième iframe nommée `zone-info`
2. Créez des liens qui ciblent cette nouvelle iframe
3. Affichez deux contenus différents simultanément

**Indice :**
```html
<iframe name="zone-info" src="info.html"></iframe>
<a href="details.html" target="zone-info">Voir détails</a>
```

---

### Exercice 4 : Sortir de l'iframe

1. Dans une page de contenu, ajoutez un bouton "Sortir de l'iframe"
2. Utilisez `target="_top"` pour charger la page dans la fenêtre complète

```html
<a href="index.html" target="_top">🔝 Sortir de l'iframe</a>
```

---

## 🎓 Résumé

**Ce que vous avez appris :**

✅ Comment créer une iframe avec l'attribut `name`  
✅ Comment utiliser `target` pour cibler une iframe spécifique  
✅ Les différentes valeurs de `target` et leurs comportements  
✅ Comment créer un système de navigation avec menu et iframe  
✅ Comment styliser une page avec iframe  

**Points clés à retenir :**

- `target="nom"` + `name="nom"` = connexion entre lien et iframe
- `target="_blank"` = nouvelle fenêtre/onglet
- `target="_self"` = même fenêtre (défaut)
- `target="_top"` = sortir de tous les frames

---

## 📚 Pour aller plus loin

- Essayez d'imbriquer plusieurs iframes
- Ajoutez des animations CSS lors du changement de page
- Créez un système de navigation avec des sous-menus
- Explorez l'attribut `sandbox` pour sécuriser les iframes
