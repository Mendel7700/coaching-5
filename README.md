# Dina Nejar — Accompagnement parental et familial

Site vitrine premium (statique) pour Dina Nejar, accompagnante parentale et familiale à Yerres et à distance : approche Shefer, coaching parental, lecture nourrie par les valeurs juives.

## Pages

- `index.html` — Accueil
- `accompagnement.html` — L'accompagnement
- `approche-shefer.html` — L'approche Shefer
- `valeurs-juives.html` — Coaching & valeurs juives
- `dina-nejar.html` — Dina Nejar
- `faq.html` — Questions fréquentes
- `contact.html` — Contact

## Structure

```
.
├── index.html + 6 pages internes
└── assets/
    ├── css/styles.css   — design system (palette, typographie, animations)
    └── js/main.js        — header compact, reveals, parallax, FAQ, formulaire
```

## Développement local

Site 100 % statique, aucune dépendance ni étape de build. Ouvrir `index.html`
dans un navigateur, ou servir le dossier :

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Déploiement

Aucune configuration requise sur Vercel ou Netlify : le dossier racine est
servi tel quel comme site statique.

## Médias

Les visuels sont des placeholders premium identifiés par un libellé visible
(ex. `dina-portrait-main`, `hero-family-atmosphere-video`). Pour les remplacer
par de vraies images/vidéos, repérer le bloc portant l'identifiant correspondant.
