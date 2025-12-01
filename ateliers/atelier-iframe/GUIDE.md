# Atelier Iframe - Guide Simple

## 🎯 Objectif
Créer un menu qui charge différentes pages dans une iframe.

---

## Étape 1 : Créer l'iframe

```html
<iframe name="mon-cadre" src="accueil.html"></iframe>
```

**Explication :**
- `name="mon-cadre"` : Le nom de l'iframe (important !)
- `src="accueil.html"` : La page à afficher au départ

---

## Étape 2 : Créer le menu

```html
<nav>
    <a href="accueil.html" target="mon-cadre">Accueil</a>
    <a href="contact.html" target="mon-cadre">Contact</a>
</nav>
```

**Explication :**
- `target="mon-cadre"` : Doit correspondre au `name` de l'iframe
- Quand on clique, la page se charge dans l'iframe

---

## Étape 3 : Code complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon site avec iframe</title>
</head>
<body>
    <h1>Mon Site</h1>
    
    <!-- Menu -->
    <nav>
        <a href="accueil.html" target="contenu">Accueil</a>
        <a href="contact.html" target="contenu">Contact</a>
    </nav>
    
    <!-- Iframe -->
    <iframe name="contenu" src="accueil.html"></iframe>
</body>
</html>
```

---

## ⚠️ Règle importante

**Le `target` du lien DOIT être égal au `name` de l'iframe !**

✅ Correct :
```html
<a href="page.html" target="cadre">Lien</a>
<iframe name="cadre"></iframe>
```

❌ Incorrect :
```html
<a href="page.html" target="cadre1">Lien</a>
<iframe name="cadre2"></iframe>
```

---

## 🎨 Ajouter du CSS (avec float)

```css
/* Menu à gauche */
nav {
    width: 200px;
    float: left;
    background: #f0f0f0;
    padding: 20px;
}

nav a {
    display: block;
    padding: 10px;
    margin: 5px 0;
    background: white;
    text-decoration: none;
    color: black;
    border: 1px solid #ddd;
    border-radius: 5px;
}

/* Zone iframe à droite */
.content-area {
    overflow: hidden;
    padding: 20px;
}

iframe {
    width: 100%;
    height: 600px;
    border: 1px solid #ccc;
}
```

**Comment ça marche :**
- `float: left` : Le menu flotte à gauche
- `overflow: hidden` : La zone de contenu prend le reste de l'espace

---

## ✅ C'est tout !

Vous savez maintenant :
1. Créer une iframe avec `name`
2. Créer des liens avec `target`
3. Faire correspondre `target` et `name`
4. Positionner le menu avec `float`

**Exercice :** Ajoutez une page "Services" au menu !
